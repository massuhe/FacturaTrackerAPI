import logger from '../../common/logger'
import Deuda, { IDeuda } from '../models/Deuda';

class DeudasService {

  public async getAll(): Promise<IDeuda[]> {
    throw new Error('Method not implemented!!');
  }
  
  public async create(data: Partial<IDeuda>): Promise<IDeuda> {
    throw new Error('Method not implemented!!');
  }

}

export default new DeudasService();