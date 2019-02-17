import ExamplesService from '../../services/examples.service';
import { Request, Response } from 'express';

export class Controller {

  public async all(req: Request, res: Response): Promise<void> {
    const r = await ExamplesService.all();
    res.json(r);
  }

  public async byId(req: Request, res: Response): Promise<void> {
    const r = await ExamplesService.byId(req.params.id);
    if (!r) {
      return res.status(404).end();
    }
    res.json(r);
  }

  public async create(req: Request, res: Response): Promise<void> {
    const r = await ExamplesService.create(req.body.name);
    res.status(201)
       .location(`<%= apiRoot %>/examples/${r.id}`)
       .json(r);
  }
}
export default new Controller();
