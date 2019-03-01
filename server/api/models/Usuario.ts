import { Schema, model, Types, Document, Model } from 'mongoose';
import { isEmail } from 'validator';
import { IOficina } from './Oficina';

/* Declare document props */
export interface IUsuarioDocument extends Document {
  nombre: string;
  apellido: string;
  email: string;
  activo: boolean;
  oficina: IOficina | string;
}

/* Declare instance methods */
export interface IUsuario extends IUsuarioDocument {}

/* Declare statics methods */
export interface IUsuarioModel extends Model<IUsuario> {
  getAll: (activo?: boolean) => IUsuario[];
  getById: (id: string, activos?: boolean) => IUsuario;
}

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: 'Se debe especificar un nombre'
  },
  apellido: {
    type: String,
    required: 'Se debe especificar un nombre'
  },
  email: {
    type: String,
    required: 'Se debe especificar un email',
    validate: [isEmail, 'El formato es inválido']
  },
  activo: {
    type: Boolean,
    default: true
  },
  oficina: {
    type: Types.ObjectId,
    ref: 'Oficina'
  }
});

/** Aggregates */

usuarioSchema.statics.getAll = function(activo: boolean = true) {
  return this.find({ activo });
}

usuarioSchema.statics.getById = function(id: string, activo: boolean = true) {
  return this.findOne({ _id: id, activo });
}

const Usuario = model<IUsuario, IUsuarioModel>('Usuario', usuarioSchema);

export default Usuario;