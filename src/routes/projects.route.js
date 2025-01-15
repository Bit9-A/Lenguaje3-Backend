import express from 'express';
import { ProjectController } from '../controllers/projects.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para proyectos
router.route('/')
  .get(verifyToken, ProjectController.getAllProjects)
  .post(verifyToken, ProjectController.createProject);

router.route('/:id')
  .get(verifyToken, ProjectController.getProjectById)
  .put(verifyToken, ProjectController.updateProject)
  .delete(verifyToken, ProjectController.deleteProject);

// Rutas para empleados en un proyecto específico
router.route('/:project_id/employees')
  .get(verifyToken, ProjectController.getEmployeesByProjectId)
  .post(verifyToken, ProjectController.addEmployeeToProject);

router.route('/:project_id/employees/:employee_id')
  .delete(verifyToken, ProjectController.removeEmployeeFromProject);

// Rutas para materiales en un proyecto específico
router.route('/:project_id/materials')
  .get(verifyToken, ProjectController.getMaterialsByProjectId)
  .post(verifyToken, ProjectController.addMaterialToProject);

router.route('/:project_id/materials/:material_id')
  .delete(verifyToken, ProjectController.removeMaterialFromProject);

// Rutas para servicios en un proyecto específico
router.route('/:project_id/services')
  .get(verifyToken, ProjectController.getServicesByProjectId)
  .post(verifyToken, ProjectController.addServiceToProject);

router.route('/:project_id/services/:service_id')
  .delete(verifyToken, ProjectController.removeServiceFromProject);

// Rutas para progreso en un proyecto específico
router.route('/:project_id/progress')
  .get(verifyToken, ProjectController.getProgressByProjectId)
  .post(verifyToken, ProjectController.addProgressToProject);

router.route('/:project_id/progress/:id')
  .delete(verifyToken, ProjectController.removeProgressFromProject);

// Rutas para fotos en un proyecto específico
router.route('/:project_id/photos')
  .get(verifyToken, ProjectController.getPhotosByProjectId)
  .post(verifyToken, ProjectController.addPhotoToProject);

router.route('/:project_id/photos/:id')
  .delete(verifyToken, ProjectController.removePhotoFromProject);

export default router;