import { Request, Response } from 'express';
import { IRegla } from '../../models/Regla';
import ReglasService from '../../services/reglas.service';
import STATUS_CODES from '../../../common/constants/statusCodes';

export class ReglasController {

  public async getAll(req: Request, res: Response): Promise<void> {
    const oficina = req.params.oficina;
    const reglas = await ReglasService.getAll(oficina);
    res.json(reglas);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const oficina = req.params.oficina;
    const reglaData = req.body;
    const regla = await ReglasService.create(oficina, reglaData);
    res.status(STATUS_CODES.CREATED)
       .json(regla);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const reglaUpdateData = req.body;
    const idRegla = req.params.regla;
    const oficina = req.params.oficina;
    const reglaUpdated = await ReglasService.update(oficina, idRegla, reglaUpdateData);
    res.json(reglaUpdated);
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const idRegla = req.params.regla;
    const oficina = req.params.oficina;
    await ReglasService.delete(oficina, idRegla);
    res.status(STATUS_CODES.NO_CONTENT)
       .send();
  }

}

export default new ReglasController();