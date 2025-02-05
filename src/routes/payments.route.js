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

// Rutas para servicios y materiales pagados y no pagados por proyecto
router.get('/unpaid-services/:project_id', verifyToken, PaymentController.getUnpaidServicesByProject);
router.get('/paid-services/:project_id', verifyToken, PaymentController.getPaidServicesByProject);
router.get('/unpaid-materials/:project_id', verifyToken, PaymentController.getUnpaidMaterialsByProject);
router.get('/paid-materials/:project_id', verifyToken, PaymentController.getPaidMaterialsByProject);

router.get('/total-cost/:project_id', verifyToken, PaymentController.getTotalCostByProjectId);
router.put('/update-service-payment/use', verifyToken, PaymentController.updateServicePaymentStatus);
router.put('/update-material-payment/use', verifyToken, PaymentController.updateMaterialPaymentStatus);

router.get('/generate-excel/use', PaymentController.generateIncomeStatisticsExcel);


export default router;