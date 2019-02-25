import { Schema, Document, model, Model } from 'mongoose';
import { NextFunction } from 'express';
import Deuda from './Deuda';
import Regla from './Regla';

/* Declare document props */
export interface IOficinaDocument extends Document {
  nombre: string;
}

/* Declare instance methods */
export interface IOficina extends IOficinaDocument { }

/* Declare statics methods */
export interface IOficinaModel extends Model<IOficina> {
  findAllWithCountReferences: () => Promise<IOficina[]>;
}

const oficinaSchema = new Schema({
  nombre: {
    type: String,
    required: 'Se debe especificar un nombre de oficina',
    unique: true
  },
}, {
  id: false,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
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

/* Hooks */

oficinaSchema.pre('remove', async function(next: NextFunction) {
  const cascadeDeletePromises = [
    Deuda.deleteMany({oficina: this._id}).exec(),
    Regla.deleteMany({oficina: this._id}).exec()
  ];
  await Promise.all(cascadeDeletePromises);
  next();
});

/* Aggregates */

/**
 * Retorna todas las oficinas con la cuenta de cada referencia en lugar de las referencias en sí. El comportamiento es similar a definir
 * un virtual con la opción de count en true. Sin embargo esta opción no funciona del todo bien, por ese motivo se recurrió a este walkaround.
 */
oficinaSchema.statics.findAllWithCountReferences = function() {
  return this.aggregate([
    {
      $lookup: {
        from: 'reglas',
        localField: '_id',
        foreignField: 'oficina',
        as: 'reglas'
      }
    },
    {
      $lookup: {
        from: 'deudas',
        localField: '_id',
        foreignField: 'oficina',
        as: 'deudas'
      }
    },
    {
      $lookup: {
        from: 'usuarios',
        localField: '_id',
        foreignField: 'oficina',
        as: 'usuarios'
      }
    },
    {
      $project: {
        nombre: 1,
        reglasCount: { $size: '$reglas' },
        usuariosCount: { $size: '$usuarios' },
        deudasCount: { $size: '$deudas' }
      }
    }
  ]);
}

const Oficina = model<IOficina, IOficinaModel>('Oficina', oficinaSchema);
export default Oficina;