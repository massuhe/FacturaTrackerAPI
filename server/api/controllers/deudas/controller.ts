import { Request, Response } from 'express';
import DeudasService from '../../services/deudas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class DeudasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    const oficina = req.params.oficina;
    const deudas = await DeudasService.getAll(oficina);
    res.json(deudas);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const oficina = req.params.oficina;
    const deudaData = req.body;
    const deuda = await DeudasService.create(oficina, deudaData);
    res.status(STATUS_CODES.CREATED)
       .json(deuda);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const deudaUpdateData = req.body;
    const idDeuda = req.params.deuda;
    const oficina = req.params.oficina;
    const deudaUpdated = await DeudasService.update(oficina, idDeuda, deudaUpdateData);
    res.json(deudaUpdated);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const idDeuda = req.params.deuda;
    const oficina = req.params.oficina;
    await DeudasService.delete(oficina, idDeuda);
    res.status(STATUS_CODES.NO_CONTENT)
       .send();
  }

}

export default new DeudasController();