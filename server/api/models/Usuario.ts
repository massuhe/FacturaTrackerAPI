import { Schema, model, Types, Document } from 'mongoose';
import { isEmail } from 'validator';
import { IOficina } from './Oficina';

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  email: string;
  oficina: IOficina | string;
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
  oficina: {
    type: Types.ObjectId,
    ref: 'Oficina'
  }
});

const Usuario = model<IUsuario>('Usuario', usuarioSchema);

export default Usuario;