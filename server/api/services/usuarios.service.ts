import Usuario, { IUsuario } from '../models/Usuario';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';
import OficinasService from './oficinas.service';
import { CustomError } from '../../common/errors/CustomError';
import STATUS_CODES from '../../common/constants/statusCodes';
import { promisify } from 'es6-promisify';

class UsuariosService {

  public async getAll(): Promise<IUsuario[]> {
    return Usuario.getAll();
  }

  public async getById(id: string): Promise<IUsuario> {
    const usuario = await Usuario.getById(id);
    if (!usuario) {
      throw new CustomError('No se ha encontrado el usuario', STATUS_CODES.NOT_FOUND);
    }
    return usuario;
  }

  public async create(data: any): Promise<any> {
    const usuarioProps = this._getUsuarioProps(data);
    await this._checkNewOficinaExist(usuarioProps);
    return this._registerUsuario(usuarioProps, data.password);
  }

  public async update(id: string, data: any): Promise<IUsuario> {
    const usuarioUpdateProps = this._getUsuarioProps(data);
    await this._validateOficinaChange(id, usuarioUpdateProps);
    const usuarioUpdated = await Usuario.findOneAndUpdate({_id: id}, usuarioUpdateProps, { new: true, runValidators: true });
    return usuarioUpdated;
  }

  public async delete(id: string): Promise<void> {
    await Usuario.findOneAndUpdate({_id: id}, { activo: false });
  }

  /***********
   * Private *
   ***********/

  private _getUsuarioProps(data: any): Partial<IUsuario> {
    const { nombre, apellido, email, oficina } = data;
    const usuarioProps: Partial<IUsuario> = { nombre, apellido, email, oficina };
    return removeUndefinedProps(usuarioProps);
  }

  private async _registerUsuario(usuario: Partial<IUsuario>, password: string): Promise<any> {
    const register = promisify(Usuario.register.bind(Usuario, new Usuario(usuario), password));
    const { _id, nombre, apellido, email }: Partial<IUsuario> = await register();
    return { _id, nombre, apellido, email };
  }

  private _validateOficinaChange(id: string, data: Partial<IUsuario>): Promise<any> {
    if (!data.oficina) return ;
    return Promise.all([
      this._checkNewOficinaExist(data),
      this._checkDeudasPendientesEnOficina(id, data.oficina as string)
    ]);
  }

  private async _checkNewOficinaExist(data: Partial<IUsuario>): Promise<void> {
    if (!data.oficina) return ;
    const oficina = await OficinasService.getById(data.oficina as string);
    if (!oficina) {
      throw new CustomError('La oficina no existe!', STATUS_CODES.BAD_REQUEST);
    }
  }

  private async _checkDeudasPendientesEnOficina(usuario: string, oficina: string): Promise<void> {
    // TODO: Validar que no existan deudas con fecha pago null para el usuario en la oficina.
    return ;
  }

}

export default new UsuariosService();