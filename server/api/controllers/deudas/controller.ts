import { Request, Response } from 'express';
import { IDeuda } from '../../models/Deuda';
import DeudasService from '../../services/deudas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class DeudasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

  public async create(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

}

export default new DeudasController();