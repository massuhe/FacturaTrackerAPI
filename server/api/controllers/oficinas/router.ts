import { Router } from 'express';
import oficinasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router
  .get('/', oficinasController.getAll)
  .get('/:oficina', oficinasController.getById)
  .post('/', catchErrors(oficinasController.create))
  .patch('/:oficina', catchErrors(oficinasController.update))
  // .get('/:oficina/deudas', oficinasController.getDeudas)
  // .post('/:oficina/deudas', oficinasController.addDeuda)
  // .patch('/:oficina/deudas/:deuda', oficinasController.updateDeuda)

export default router;