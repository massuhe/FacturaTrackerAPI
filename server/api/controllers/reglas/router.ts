import { Router } from 'express';
import reglasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router({ mergeParams: true });

router
  .get('/', reglasController.getAll)
  // .get('/:regla', reglasController.getById)
  .post('/', catchErrors(reglasController.create))

export default router;