import logger from '../../common/logger'
import Deuda, { IDeuda } from '../models/Deuda';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';

class DeudasService {

  public async getAll(oficina: string): Promise<IDeuda[]> {
    return Deuda.find({oficina});
  }
  
  public async create(oficina: string, data: Partial<IDeuda>): Promise<IDeuda> {
    const deudaData = this.buildNewDeuda(oficina, data);
    await this.validateNewDeuda(deudaData);
    const deuda = new Deuda(deudaData);
    await deuda.save();
    return deuda;
  }

  public async update(oficina: string, idDeuda: string, data: Partial<IDeuda>): Promise<IDeuda> {
    const deudaUpdateData = this.getDeudaUpdateProps(data);
    const newDeuda = await Deuda.findOneAndUpdate({_id: idDeuda, oficina}, deudaUpdateData, { new: true, runValidators: true });
    return newDeuda;
  }

  public async delete(oficina: string, idDeuda: string): Promise<void> {
    const deudaToDelete = await Deuda.findOne({_id: idDeuda, oficina});
    await deudaToDelete.remove();
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

  private getDeudaUpdateProps(data: Partial<IDeuda>): Partial<IDeuda> {
    const { reglaInflingida, fiscal, fechaPago } = data;
    return removeUndefinedProps({ reglaInflingida, fiscal, fechaPago });
  }

}

export default new DeudasService();