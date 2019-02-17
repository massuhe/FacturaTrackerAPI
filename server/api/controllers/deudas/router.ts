import { Router } from 'express';
import deudasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router.get('/', deudasController.getAll);
router.post('/', catchErrors(deudasController.create));

export default router;