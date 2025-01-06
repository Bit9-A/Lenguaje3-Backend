import express from 'express';
import { NotificationsAndInteractionsController } from '../controllers/notifications.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para notifications
router.get('/notifications', verifyToken, NotificationsAndInteractionsController.getAllNotifications);
router.get('/notifications/:id', verifyToken, NotificationsAndInteractionsController.getNotificationById);
router.post('/notifications', verifyToken, NotificationsAndInteractionsController.createNotification);
router.put('/notifications/:id', verifyToken, NotificationsAndInteractionsController.updateNotification);
router.delete('/notifications/:id', verifyToken, NotificationsAndInteractionsController.deleteNotification);

// Rutas para client_interactions
router.get('/interactions', verifyToken, NotificationsAndInteractionsController.getAllClientInteractions);
router.get('/interactions/:id', verifyToken, NotificationsAndInteractionsController.getClientInteractionById);
router.post('/interactions', verifyToken, NotificationsAndInteractionsController.createClientInteraction);
router.put('/interactions/:id', verifyToken, NotificationsAndInteractionsController.updateClientInteraction);
router.delete('/interactions/:id', verifyToken, NotificationsAndInteractionsController.deleteClientInteraction);

export default router;