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

// Rutas para manejar servicios en proyectos
router.post('/add-service', verifyToken, ProjectController.addServiceToProject);
router.delete('/remove-service/:project_id/:service_id', verifyToken, ProjectController.removeServiceFromProject);
router.get('/services/:project_id', verifyToken, ProjectController.getServicesByProjectId);

// Rutas para manejar materiales en proyectos
router.post('/add-material', verifyToken, ProjectController.addMaterialToProject);
router.delete('/remove-material/:project_id/:material_id', verifyToken, ProjectController.removeMaterialFromProject);
router.put('/update-material-quantity', verifyToken, ProjectController.updateMaterialQuantity);
router.get('/materials/:project_id', verifyToken, ProjectController.getMaterialsByProjectId);

// Rutas para manejar empleados en proyectos
router.post('/add-employee', verifyToken, ProjectController.addEmployeeToProject);
router.delete('/remove-employee/:project_id/:employee_id', verifyToken, ProjectController.removeEmployeeFromProject);
router.get('/employees/:project_id', verifyToken, ProjectController.getEmployeesByProjectId);

// Rutas para manejar fotos en proyectos
router.post('/add-photo', verifyToken, ProjectController.addPhotoToProject);
router.delete('/remove-photo/:photo_id', verifyToken, ProjectController.removePhotoFromProject);

// Ruta para recuperar el nombre del cliente a partir de la ID de la propuesta
router.get('/client-name/:proposal_id', verifyToken, ProjectController.getClientNameByProposalId);

export default router;