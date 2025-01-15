import express from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.get('/', verifyToken, DashboardController.getDashboardData);

export default router;