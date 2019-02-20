import logger from '../../common/logger'
import Deuda, { IDeuda } from '../models/Deuda';

class DeudasService {

  public async getAll(): Promise<IDeuda[]> {
    throw new Error('Method not implemented!!');
  }
  
  public async create(oficina: string, data: Partial<IDeuda>): Promise<IDeuda> {
    const deudaData = this.buildNewDeuda(oficina, data);
    await this.validateNewDeuda(deudaData);
    const deuda = new Deuda(deudaData);
    await deuda.save();
    return deuda;
  }

  /***********
   * Private *
   ***********/

  private buildNewDeuda(oficina: string, data: Partial<IDeuda>): Partial<IDeuda> {
    const { deudor, reglaInflingida } = data;
    return { deudor, reglaInflingida, oficina };
  }

  private validateNewDeuda(deuda: Partial<IDeuda>): Promise<any> {
    // TODO: Validar:
    // - La regla pertenece a la oficina.
    // - El usuario pertenece a la oficina.
    return ;
  }

}

export default new DeudasService();