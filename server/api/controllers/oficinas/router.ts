import { Router } from 'express';
import oficinasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router
  .get('/', oficinasController.getAll)
  .get('/:oficina', catchErrors(oficinasController.getById))
  .post('/', catchErrors(oficinasController.create))
  .patch('/:oficina', catchErrors(oficinasController.update))
  .delete('/:oficina', catchErrors(oficinasController.delete))

export default router;