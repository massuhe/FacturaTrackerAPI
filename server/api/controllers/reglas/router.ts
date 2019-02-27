import { Router } from 'express';
import reglasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router({ mergeParams: true });

router
  .get('/', reglasController.getAll)
  .post('/', catchErrors(reglasController.create))
  .patch('/:regla', catchErrors(reglasController.update))
  // TODO: Dejar comentado hasta definir qué hacer con las deudas que tienen una regla asociada.
  //       Por ahora la mejor solución es tener una propiead "activa" en lugar de permitir que se elimine.
  // .delete('/:regla', catchErrors(reglasController.delete))

export default router;