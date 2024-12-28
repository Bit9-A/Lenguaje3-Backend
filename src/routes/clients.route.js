import express from 'express';
import { ClientController } from '../controllers/clients.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.get('/', verifyToken,ClientController.getAllClients);
router.get('/:id',verifyToken, ClientController.getClientById);
//router.get('/email/:email', ClientController.getClientByEmail);
router.post('/', ClientController.createClient);
router.put('/:id', verifyToken,ClientController.updateClient);
router.delete('/:id',verifyToken, ClientController.deleteClient);

export default router;