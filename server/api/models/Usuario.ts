import { Schema, model, Types, Document, Model } from 'mongoose';
import { isEmail } from 'validator';
import { IOficina } from './Oficina';

/* Declare document props */
export interface IUsuarioDocument extends Document {
  nombre: string;
  apellido: string;
  email: string;
  oficina: IOficina | string;
}

/* Declare instance methods */
export interface IUsuario extends IUsuarioDocument {}

/* Declare statics methods */
export interface IUsuarioModel extends Model<IUsuario> {}

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
  oficina: {
    type: Types.ObjectId,
    ref: 'Oficina'
  }
});

const Usuario = model<IUsuario, IUsuarioModel>('Usuario', usuarioSchema);

export default Usuario;