import { Schema, model, Types, Document, Model } from 'mongoose';
import { IOficina } from './Oficina';
import { IUsuario } from './Usuario';
import { IRegla } from './Regla';
import { NextFunction } from 'express';

export interface IDeudaDocument extends Document {
  fechaCreacion: Date;
  deudor: IUsuario | string;
  oficina: IOficina | string;
  reglaInflingida: IRegla | string;
  fiscal?: IUsuario | string;
  fechaPago?: Date;
}

export interface IDeuda extends IDeudaDocument {}

export interface IDeudaModel extends Model<IDeuda> {}

const deudaSchema = new Schema({
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaPago: Date,
  deudor: {
    type: Types.ObjectId,
    ref: 'Usuario',
    required: 'Se debe especificar un usuario deudor'
  },
  fiscal: {
    type: Types.ObjectId,
    ref: 'Usuario'
  },
  reglaInflingida: {
    type: Types.ObjectId,
    ref: 'Regla',
    required: 'Se debe espeficiar una regla inflingida'
  },
  oficina: {
    type: Types.ObjectId,
    ref: 'Oficina',
    required: 'Se debe espeficiar una oficina'
  }
});

const autoPopulate = function(next: NextFunction) {
  this.populate('deudor', 'nombre apellido')
      .populate('fiscal', 'nombre apellido')
      .populate('reglaInflingida', 'descripcion');
  next();
}

deudaSchema.pre('find', autoPopulate);
deudaSchema.pre('findOne', autoPopulate);

const Deuda = model<IDeuda, IDeudaModel>('Deuda', deudaSchema);
export default Deuda;