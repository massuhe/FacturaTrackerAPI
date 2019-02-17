import { Schema, Document, model } from 'mongoose';
import { NextFunction } from 'express';

export interface IOficina extends Document {
  nombre: string;
}

const oficinaSchema = new Schema({
  nombre: {
    type: String,
    required: 'Se debe especificar un nombre de oficina',
    unique: true
  },
}, {
  id: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

oficinaSchema.virtual('reglas', {
  ref: 'Regla',
  localField: '_id',
  foreignField: 'oficina'
});

oficinaSchema.virtual('deudas', {
  ref: 'Deuda',
  localField: '_id',
  foreignField: 'oficina'
});

oficinaSchema.virtual('usuarios', {
  ref: 'Usuario',
  localField: '_id',
  foreignField: 'oficina'
});

const autoPopulate = function(next: NextFunction): void {
  this
    .populate('usuarios')
    .populate('reglas')
    .populate('deudas');
  next();
}

oficinaSchema.pre('find', autoPopulate);
oficinaSchema.pre('findOne', autoPopulate);

const Oficina = model<IOficina>('Oficina', oficinaSchema);
export default Oficina;