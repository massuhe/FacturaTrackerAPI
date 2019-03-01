import { Router } from 'express';
import usuariosController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router
  .get('/', catchErrors(usuariosController.getAll))
  .get('/:usuario', catchErrors(usuariosController.getById))
  .post('/', catchErrors(usuariosController.create))
  .patch('/:usuario', catchErrors(usuariosController.update))
  .delete('/:usuario', catchErrors(usuariosController.delete))

export default router;