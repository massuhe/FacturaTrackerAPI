import { Router } from 'express';
import controller from './controller'

const router = Router();

router.post('/', controller.create)
router.get('/', controller.all)
router.get('/:id', controller.byId);

export default router;