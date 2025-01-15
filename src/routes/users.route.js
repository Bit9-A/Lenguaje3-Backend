import express from 'express';
import { UserController } from '../controllers/users.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para users
router.get('/', verifyToken, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);
router.put('/:id', verifyToken, UserController.updateUser);
router.delete('/:id', verifyToken, UserController.deleteUser);

// Rutas para user_roles
router.get('/roles/all', verifyToken, UserController.getAllUserRoles);
router.get('/roles/:id', verifyToken, UserController.getUserRoleById);
router.post('/roles', verifyToken, UserController.createUserRole);
router.put('/roles/:id', verifyToken, UserController.updateUserRole);
router.delete('/roles/:id', verifyToken, UserController.deleteUserRole);

// Rutas para registro, login, perfil y logout
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile/use', verifyToken, UserController.profile);
router.post('/logout', verifyToken, UserController.logout);

// Rutas para recuperación de contraseña
router.post('/request-password-reset', UserController.requestPasswordReset);
router.post('/reset-password', UserController.resetPassword);

export default router;