import express from 'express';
import { ProjectController } from '../controllers/projects.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

// Rutas para projects
router.get('/', verifyToken, ProjectController.getAllProjects);
router.get('/:id', verifyToken, ProjectController.getProjectById);
router.post('/', verifyToken, ProjectController.createProject);
router.put('/:id', verifyToken, ProjectController.updateProject);
router.delete('/:id', verifyToken, ProjectController.deleteProject);

// Rutas para obtener empleados, materiales, servicios, progreso y fotos de un proyecto específico
router.get('/:project_id/employees', verifyToken, ProjectController.getEmployeesByProjectId);
router.get('/:project_id/materials', verifyToken, ProjectController.getMaterialsByProjectId);
router.get('/:project_id/services', verifyToken, ProjectController.getServicesByProjectId);
router.get('/:project_id/progress', verifyToken, ProjectController.getProgressByProjectId);
router.get('/:project_id/photos', verifyToken, ProjectController.getPhotosByProjectId);

// Rutas para añadir, borrar y modificar empleados, materiales, servicios, progreso y fotos en un proyecto específico
router.post('/employees', verifyToken, ProjectController.addEmployeeToProject);
router.delete('/employees/:project_id/:employee_id', verifyToken, ProjectController.removeEmployeeFromProject);

router.post('/materials', verifyToken, ProjectController.addMaterialToProject);
router.delete('/materials/:project_id/:material_id', verifyToken, ProjectController.removeMaterialFromProject);

router.post('/services', verifyToken, ProjectController.addServiceToProject);
router.delete('/services/:project_id/:service_id', verifyToken, ProjectController.removeServiceFromProject);

router.post('/progress', verifyToken, ProjectController.addProgressToProject);
router.delete('/progress/:id', verifyToken, ProjectController.removeProgressFromProject);

router.post('/photos', verifyToken, ProjectController.addPhotoToProject);
router.delete('/photos/:id', verifyToken, ProjectController.removePhotoFromProject);

export default router;