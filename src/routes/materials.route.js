import express from 'express';
import { MaterialController } from '../controllers/materials.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para materials
router.route('/')
  .get(verifyToken, MaterialController.getAllMaterials)
  .post(verifyToken, MaterialController.createMaterial);

router.route('/:id')
  .get(verifyToken, MaterialController.getMaterialById)
  .put(verifyToken, MaterialController.updateMaterial)
  .delete(verifyToken, MaterialController.deleteMaterial);

// Rutas para material_types
router.route('/types/all')
  .get(verifyToken, MaterialController.getAllMaterialTypes);

router.route('/types/:id')
  .get(verifyToken, MaterialController.getMaterialTypeById)
  .put(verifyToken, MaterialController.updateMaterialType)
  .delete(verifyToken, MaterialController.deleteMaterialType);

router.route('/types/create')
  .post(verifyToken, MaterialController.createMaterialType);

export default router;