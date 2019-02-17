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
    await this.checkOficina(usuarioProps);
    const newUsuario = new Usuario(usuarioProps);
    await newUsuario.save();
    return newUsuario;
  }

  public async update(id: string, data: any): Promise<IUsuario> {
    const usuarioUpdateProps = removeUndefinedProps(this.getUsuarioProps(data));
    await this.checkOficina(usuarioUpdateProps);
    const usuarioUpdated = await Usuario.findOneAndUpdate({_id: id}, usuarioUpdateProps, { new: true, runValidators: true });
    return usuarioUpdated;
  }

  private getUsuarioProps(data: any): Partial<IUsuario> {
    const { nombre, apellido, email, oficina } = data;
    return { nombre, apellido, email, oficina };
  }

  private async checkOficina(data: Partial<IUsuario>): Promise<void> {
    if (!data.oficina) return ;
    const oficina = await OficinasService.getById(data.oficina as string);
    if (!oficina) {
      throw new CustomError('La oficina no existe!', STATUS_CODES.BAD_REQUEST);
    }
  }

}

export default new UsuariosService();