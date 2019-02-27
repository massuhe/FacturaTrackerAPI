import { Router } from 'express';
import deudasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router({ mergeParams: true });

router.get('/', catchErrors(deudasController.getAll))
      .post('/', catchErrors(deudasController.create))
      .patch('/:deuda', catchErrors(deudasController.update))
      .delete('/:deuda', catchErrors(deudasController.delete))

export default router;