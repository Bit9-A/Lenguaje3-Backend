import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile', verifyToken, AuthController.profile);
router.post('/logout', verifyToken, AuthController.logout);
router.post('/request-password-reset', AuthController.requestPasswordReset);
router.post('/reset-password', AuthController.resetPassword);
router.post('/extend-session', verifyToken, AuthController.extendSession);

export default router;