import { Request, Response } from 'express';
import { IRegla } from '../../models/Regla';
import ReglasService from '../../services/reglas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class ReglasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

  public async create(req: Request, res: Response): Promise<void> {
    const oficina = req.params.oficina;
    const reglaData = req.body;
    const regla = await ReglasService.create(oficina, reglaData);
    res.status(STATUS_CODES.CREATED)
       .json(regla);
  }

}

export default new ReglasController();