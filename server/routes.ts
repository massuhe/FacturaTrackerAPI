import { Application } from 'express';
import usuariosRouter from './api/controllers/usuarios/router';
import oficinasRouter from './api/controllers/oficinas/router';
import reglasRouter from './api/controllers/reglas/router';
import deudasRouter from './api/controllers/deudas/router';
import authRouter from './api/controllers/auth/router';
import passport from 'passport';

const protectRoute = passport.authenticate('jwt', { session: false });

export default function routes(app: Application): void {
  app.use('/auth', authRouter)
  app.use('/api/v1/usuarios', protectRoute, usuariosRouter);
  app.use('/api/v1/oficinas', protectRoute, oficinasRouter);
  app.use('/api/v1/oficinas/:oficina/reglas', protectRoute, reglasRouter);
  app.use('/api/v1/oficinas/:oficina/deudas', protectRoute, deudasRouter);
};