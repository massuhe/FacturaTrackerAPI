import { Request, Response } from 'express';
import UsuariosService from '../../services/usuarios.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

class UsuariosController {

  public async getAll(req: Request, res: Response): Promise<void> {
    const usuarios = await UsuariosService.getAll();
    res.json(usuarios);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const idUsuario = req.params.usuario;
    const usuario = await UsuariosService.getById(idUsuario);
    res.json(usuario);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const usuarioData = req.body;
    const newUsuario = await UsuariosService.create(usuarioData);
    res.status(STATUS_CODES.CREATED)
       .json(newUsuario);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const usuarioUpdateData = req.body;
    const idUsuario = req.params.usuario;
    const usuarioUpdated = await UsuariosService.update(idUsuario, usuarioUpdateData);
    res.json(usuarioUpdated);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const idUsuario = req.params.usuario;
    await UsuariosService.delete(idUsuario);
    res.status(STATUS_CODES.NO_CONTENT)
       .send();
  }

}

export default new UsuariosController();