import logger from '../../common/logger'
import Oficina, { IOficina } from '../models/Oficina';
import removeUndefinedProps from '../../common/utils/removeUndefinedProps';
import { CustomError } from '../../common/errors/CustomError';
import STATUS_CODES from '../../common/constants/statusCodes';

class OficinasService {

  public async getAll(): Promise<IOficina[]> {
    return Oficina.findAllWithCountReferences();
  }

  public async getById(id: string): Promise<IOficina> {
    const oficina = await Oficina
      .findById(id)
      .populate('usuarios')
      .populate('reglas')
      .populate('deudas')
      .lean();
    if (!oficina) {
      throw new CustomError('No se ha encontrado la oficina', STATUS_CODES.NOT_FOUND);
    }
    return oficina;
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

  public async delete(id: string): Promise<void> {
    // return Oficina.findOneAndDelete({_id: id});
    const oficinaToDelete = await Oficina.findById(id);
    await oficinaToDelete.remove();
  }

}

export default new OficinasService();