import { Router } from 'express';
import usuariosController from './controller';
import catchErrors from '../../../common/helpers/errorCatcher';

const router = Router();

router.get('/', usuariosController.getAll);
router.post('/', catchErrors(usuariosController.create));
router.patch('/:usuario', catchErrors(usuariosController.update));

export default router;