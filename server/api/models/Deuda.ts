import { Schema, model, Types, Document } from 'mongoose';
import { IOficina } from './Oficina';
import { IUsuario } from './Usuario';
import { IRegla } from './Regla';
import { NextFunction } from 'express';

export interface IDeuda extends Document {
  fechaCreacion: Date;
  deudor: IUsuario | string;
  oficina: IOficina | string;
  reglaInflingida: IRegla | string;
  fiscal?: IUsuario | string;
  fechaPago?: Date;
}

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

const Deuda = model<IDeuda>('Deuda', deudaSchema);
export default Deuda;