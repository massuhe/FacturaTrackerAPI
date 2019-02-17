import { Request, Response } from 'express';
import { IRegla } from '../../models/Regla';
import ReglasService from '../../services/reglas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class ReglasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

  public async create(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

}

export default new ReglasController();