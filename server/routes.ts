import { Application } from 'express';
import usuariosRouter from './api/controllers/usuarios/router';
import oficinasRouter from './api/controllers/oficinas/router';
import reglasRouter from './api/controllers/reglas/router';
import deudasRouter from './api/controllers/deudas/router';

export default function routes(app: Application): void {
  app.use('/api/v1/usuarios', usuariosRouter);
  app.use('/api/v1/oficinas', oficinasRouter);
  app.use('/api/v1/oficinas/:oficina/reglas', reglasRouter);
  app.use('/api/v1/oficinas/:oficina/deudas', deudasRouter);
};