import { Schema, model, Types, Document, Model } from 'mongoose';
import { IOficina } from './Oficina';

/* Declare document props */
export interface IReglaDocument extends Document {
  descripcion: string;
  prenda: string;
  oficina: IOficina | string;
}

/* Declare instance methods */
export interface IRegla extends IReglaDocument { }

/* Declare statics methods */
export interface IReglaModel extends Model<IRegla> { }

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

const Regla = model<IRegla, IReglaModel>('Regla', reglaSchema);
export default Regla;