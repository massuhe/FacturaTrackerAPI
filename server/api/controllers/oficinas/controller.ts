import { Request, Response } from 'express';
import { IOficina } from '../../models/Oficina';
import OficinasService from '../../services/oficinas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class OficinasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    const oficinas = await OficinasService.getAll();
    res.json(oficinas);
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const idOficina = req.params.oficina;
    const oficina = await OficinasService.getById(idOficina);
    res.json(oficina);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const oficinaData = req.body as Partial<IOficina>;
    console.log(req.body);
    const newOficina = await OficinasService.create(oficinaData);
    res.status(STATUS_CODES.CREATED)
       .json(newOficina);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const oficinaUpdateData = req.body;
    const idOficina = req.params.oficina;
    const oficinaUpdated = await OficinasService.update(idOficina, oficinaUpdateData);
    res.json(oficinaUpdated);
  }

}

export default new OficinasController();