import logger from '../../common/logger'
import Regla, { IRegla } from '../models/Regla';

class ReglasService {

  public async getAll(): Promise<IRegla[]> {
    throw new Error('Method not implemented!!');
  }
  
  public async create(data: Partial<IRegla>): Promise<IRegla> {
    throw new Error('Method not implemented!!');
  }

}

export default new ReglasService();