import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/jwt.middleware.js";

const router = Router()

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);



router.get('/profile', verifyToken, UserController.profile);
router.get('/', verifyToken, UserController.getAllUsers);
router.get('/:id', verifyToken, UserController.getUserById);

export default router;