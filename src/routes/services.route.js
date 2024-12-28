import express from 'express';

import {  ServiceController } from '../controllers/services.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();


router.get('/', ServiceController.getAllServices);
router.get('/:id', ServiceController.getServiceById);


router.post('/', verifyToken, ServiceController.createService);
router.put('/:id', verifyToken, ServiceController.updateService);
router.delete('/:id', verifyToken, ServiceController.deleteService);

export default router;