import { Router } from 'express';
import reglasController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router.get('/', reglasController.getAll);
router.post('/', catchErrors(reglasController.create));

export default router;