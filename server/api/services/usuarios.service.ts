import Usuario, { IUsuario } from '../models/Usuario';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';
import OficinasService from './oficinas.service';
import { CustomError } from '../../common/errors/CustomError';
import STATUS_CODES from '../../common/constants/statusCodes';

class UsuariosService {

  public async getAll(): Promise<IUsuario[]> {
    return Usuario.find();
  }

  public async create(data: any): Promise<IUsuario> {
    const usuarioProps = this.getUsuarioProps(data);
    await this.checkNewOficinaExist(usuarioProps);
    const newUsuario = new Usuario(usuarioProps);
    await newUsuario.save();
    return newUsuario;
  }

  public async update(id: string, data: any): Promise<IUsuario> {
    const usuarioUpdateProps = removeUndefinedProps(this.getUsuarioProps(data));
    await this.validateOficinaChange(id, usuarioUpdateProps);
    const usuarioUpdated = await Usuario.findOneAndUpdate({_id: id}, usuarioUpdateProps, { new: true, runValidators: true });
    return usuarioUpdated;
  }

  /***********
   * Private *
   ***********/

  private getUsuarioProps(data: any): Partial<IUsuario> {
    const { nombre, apellido, email, oficina } = data;
    return { nombre, apellido, email, oficina };
  }

  private validateOficinaChange(id: string, data: Partial<IUsuario>): Promise<any> {
    if (!data.oficina) return ;
    return Promise.all([
      this.checkNewOficinaExist(data),
      this.checkDeudasPendientesEnOficina(id, data.oficina as string)
    ]);
  }

  private async checkNewOficinaExist(data: Partial<IUsuario>): Promise<void> {
    if (!data.oficina) return ;
    const oficina = await OficinasService.getById(data.oficina as string);
    if (!oficina) {
      throw new CustomError('La oficina no existe!', STATUS_CODES.BAD_REQUEST);
    }
  }

  private async checkDeudasPendientesEnOficina(usuario: string, oficina: string): Promise<void> {
    // TODO: Validar que no existan deudas con fecha pago null para el usuario en la oficina.
    return ;
  }

}

export default new UsuariosService();