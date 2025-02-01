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

export default router;