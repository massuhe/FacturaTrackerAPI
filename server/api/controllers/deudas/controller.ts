import { Request, Response } from 'express';
import DeudasService from '../../services/deudas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class DeudasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    throw new Error('Method not implemented!!');
  }

  public async create(req: Request, res: Response): Promise<void> {
    const idOficina = req.params.oficina;
    const deudaData = req.body;
    const deuda = await DeudasService.create(idOficina, deudaData);
    res.status(STATUS_CODES.CREATED)
       .json(deuda);
  }

}

export default new DeudasController();