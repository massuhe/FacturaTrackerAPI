import { Schema, model, Types, Document } from 'mongoose';
import { IOficina } from './Oficina';

export interface IRegla extends Document {
  descripcion: string;
  prenda: string;
  oficina: IOficina | string;
}

const reglaSchema = new Schema({
  descripcion: {
    type: String,
    required: 'Se debe especificar una descripción',
    trim: true
  },
  prenda: {
    type: String,
    required: 'Se debe especificar una prenda',
    trim: true
  },
  oficina: {
    type: Types.ObjectId,
    ref: 'Oficina'
  }
});

const Regla = model<IRegla>('Regla', reglaSchema);
export default Regla;