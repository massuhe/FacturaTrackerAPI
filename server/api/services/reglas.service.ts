import logger from '../../common/logger'
import Regla, { IRegla } from '../models/Regla';

class ReglasService {

  public async getAll(): Promise<IRegla[]> {
    throw new Error('Method not implemented!!');
  }
  
  public async create(oficina: string, data: Partial<IRegla>): Promise<IRegla> {
    const reglaData = this.buildNewRegla(oficina, data);
    console.log('Regla to store', reglaData);
    const regla = new Regla(reglaData);
    await regla.save();
    return regla;
  }

  private buildNewRegla(oficina: string, data: Partial<IRegla>): Partial<IRegla> {
    const { descripcion, prenda } = data;
    return { descripcion, prenda, oficina };
  }

}

export default new ReglasService();