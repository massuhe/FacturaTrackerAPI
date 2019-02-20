import logger from '../../common/logger'
import Oficina, { IOficina } from '../models/Oficina';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';

class OficinasService {

  public async getAll(): Promise<IOficina[]> {
    return Oficina.findAllWithCountReferences();
  }

  public async getById(id: string): Promise<IOficina> {
    return Oficina
      .findById(id)
      .populate('usuarios')
      .populate('reglas')
      .populate('deudas')
      .lean();
  }
  
  public async create(data: Partial<IOficina>): Promise<IOficina> {
    const newOficina = new Oficina(data);
    await newOficina.save();
    return newOficina;
  }

  public async update(id: string, data: any): Promise<IOficina> {
    const oficinaUpdateProps = removeUndefinedProps({nombre: data.nombre});
    const oficinaUpdated = await Oficina.findOneAndUpdate({_id: id}, oficinaUpdateProps, { new: true, runValidators: true });
    return oficinaUpdated;
  }

  public async delete(id: string): Promise<IOficina> {
    return Oficina.findOneAndDelete({_id: id});
  }

}

export default new OficinasService();