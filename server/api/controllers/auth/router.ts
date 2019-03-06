import { Router } from 'express';
import catchErrors from '../../../common/helpers/errorCatcher';
import authController from './controller';

const router = Router({ mergeParams: true });

router
  .post('/login', catchErrors(authController.login))

export default router;