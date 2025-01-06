import express from 'express';
import { MaterialController } from '../controllers/materials.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para materials
router.get('/', verifyToken, MaterialController.getAllMaterials);
router.get('/:id', verifyToken, MaterialController.getMaterialById);
router.post('/', verifyToken, MaterialController.createMaterial);
router.put('/:id', verifyToken, MaterialController.updateMaterial);
router.delete('/:id', verifyToken, MaterialController.deleteMaterial);

// Rutas para material_types
router.get('/types', verifyToken, MaterialController.getAllMaterialTypes);
router.get('/types/:id', verifyToken, MaterialController.getMaterialTypeById);
router.post('/types', verifyToken, MaterialController.createMaterialType);
router.put('/types/:id', verifyToken, MaterialController.updateMaterialType);
router.delete('/types/:id', verifyToken, MaterialController.deleteMaterialType);

export default router;