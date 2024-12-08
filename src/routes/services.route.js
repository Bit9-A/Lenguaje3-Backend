import express from 'express';

import { serviceController } from '../controllers/services.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();


router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.getServiceById);


router.post('/', verifyToken, serviceController.createService);
router.put('/:id', verifyToken, serviceController.updateService);
router.delete('/:id', verifyToken, serviceController.deleteService);

export default router;