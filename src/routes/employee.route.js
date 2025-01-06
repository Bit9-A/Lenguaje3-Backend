import express from 'express';
import { EmployeeController } from '../controllers/employee.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para employees
router.get('/', verifyToken, EmployeeController.getAllEmployees);
router.get('/:id', verifyToken, EmployeeController.getEmployeeById);
router.post('/', verifyToken, EmployeeController.createEmployee);
router.put('/:id', verifyToken, EmployeeController.updateEmployee);
router.delete('/:id', verifyToken, EmployeeController.deleteEmployee);

// Rutas para employee_types
router.get('/types', verifyToken, EmployeeController.getAllEmployeeTypes);
router.get('/types/:id', verifyToken, EmployeeController.getEmployeeTypeById);
router.post('/types', verifyToken, EmployeeController.createEmployeeType);
router.put('/types/:id', verifyToken, EmployeeController.updateEmployeeType);
router.delete('/types/:id', verifyToken, EmployeeController.deleteEmployeeType);

export default router;