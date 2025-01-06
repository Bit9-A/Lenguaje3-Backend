import express from 'express';
import { PaymentController } from '../controllers/payments.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para payments
router.get('/', verifyToken, PaymentController.getAllPayments);
router.get('/:id', verifyToken, PaymentController.getPaymentById);
router.post('/', verifyToken, PaymentController.createPayment);
router.put('/:id', verifyToken, PaymentController.updatePayment);
router.delete('/:id', verifyToken, PaymentController.deletePayment);

// Rutas para payment_types
router.get('/types', verifyToken, PaymentController.getAllPaymentTypes);
router.get('/types/:id', verifyToken, PaymentController.getPaymentTypeById);
router.post('/types', verifyToken, PaymentController.createPaymentType);
router.put('/types/:id', verifyToken, PaymentController.updatePaymentType);
router.delete('/types/:id', verifyToken, PaymentController.deletePaymentType);

export default router;