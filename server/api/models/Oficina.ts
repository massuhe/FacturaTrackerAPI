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
  findAllWithCountReferences: (activo?: boolean) => Promise<IOficina[]>;
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
oficinaSchema.statics.findAllWithCountReferences = function(activo: boolean = true) {
  return this.aggregate([
    // Join con reglas
    {
      $lookup: {
        from: 'reglas',
        localField: '_id',
        foreignField: 'oficina',
        as: 'reglas'
      }
    },
    // Join con deudas
    {
      $lookup: {
        from: 'deudas',
        localField: '_id',
        foreignField: 'oficina',
        as: 'deudas'
      }
    },
    // Join con usuarios
    {
      $lookup: {
        from: 'usuarios',
        let: { oficina: '$_id' },
        // Incluyo sólo aquellos usuarios que estén activos
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$oficina', '$$oficina'] },
                  { $eq: ['$activo', activo] },
                ]
              }
            }
          }
        ],
        as: 'usuarios'
      }
    },
    // Al final sólo me quedo con la cantidad de cada recurso
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