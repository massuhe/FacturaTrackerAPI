import logger from '../../common/logger'
import Regla, { IRegla } from '../models/Regla';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';

class ReglasService {

  public async getAll(oficina: string): Promise<IRegla[]> {
    return Regla.find({oficina});
  }
  
  public async create(oficina: string, data: Partial<IRegla>): Promise<IRegla> {
    const reglaData = this.buildNewRegla(oficina, data);
    const regla = new Regla(reglaData);
    await regla.save();
    return regla;
  }

  public async update(oficina: string, idRegla: string, data: Partial<IRegla>): Promise<IRegla> {
    const reglaUpdateData = this.getReglaUpdateProps(data);
    const newRegla = await Regla.findOneAndUpdate({_id: idRegla, oficina}, reglaUpdateData, { new: true, runValidators: true });
    return newRegla;
  }

  public async delete(oficina: string, id: string): Promise<void> {
    const reglaToDelete = await Regla.findOne({_id: id, oficina});
    await reglaToDelete.remove();
  }

  /***********
   * Private *
   ***********/

  private buildNewRegla(oficina: string, data: Partial<IRegla>): Partial<IRegla> {
    const { descripcion, prenda } = data;
    return { descripcion, prenda, oficina };
  }

  private getReglaUpdateProps(data: Partial<IRegla>): Partial<IRegla> {
    const { descripcion, prenda } = data;
    return removeUndefinedProps({ descripcion, prenda });
  }

}

export default new ReglasService();