import { Application } from 'express';
import usuariosRouter from './api/controllers/usuarios/router';
import oficinasRouter from './api/controllers/oficinas/router';

export default function routes(app: Application): void {
  app.use('/api/v1/usuarios', usuariosRouter);
  app.use('/api/v1/oficinas', oficinasRouter);
};