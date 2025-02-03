import { ProjectModel } from '../models/projects.model.js';

const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAllProjectsWithDetails();
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectModel.findProjectDetailsById(id);
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createProject = async (req, res) => {
  try {
    const newProject = await ProjectModel.createProject(req.body);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProject = await ProjectModel.updateProject(id, req.body);
    if (!updatedProject) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.json(updatedProject);
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await ProjectModel.removeProject(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para manejar empleados en proyectos
const addEmployeeToProject = async (req, res) => {
  try {
    const { project_id, employee_id } = req.body;

    if (!project_id || !employee_id) {
      return res.status(400).json({
        msg: 'Project ID and employee ID are required'
      });
    }

    const newEmployee = await ProjectModel.addEmployeeToProject({
      project_id,
      employee_id
    });

    res.status(201).json({
      msg: 'Employee added to project successfully',
      employee: newEmployee
    });
  } catch (error) {
    console.error("Error adding employee to project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const removeEmployeeFromProject = async (req, res) => {
  try {
    const { project_id, employee_id } = req.params;
    await ProjectModel.removeEmployeeFromProject(project_id, employee_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing employee from project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getEmployeesByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const employees = await ProjectModel.getEmployeesByProjectId(project_id);
    res.json(employees);
  } catch (error) {
    console.error("Error fetching employees for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para manejar materiales en proyectos
const addMaterialToProject = async (req, res) => {
  try {
    const { project_id, material_id, quantity } = req.body;
    const newMaterial = await ProjectModel.addMaterialToProject({ project_id, material_id, quantity });
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error("Error adding material to project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const removeMaterialFromProject = async (req, res) => {
  try {
    const { project_id, material_id } = req.params;
    await ProjectModel.removeMaterialFromProject(project_id, material_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing material from project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateMaterialQuantity = async (req, res) => {
  try {
    const { project_id, material_id } = req.params;
    const { quantity } = req.body;
    const updatedMaterial = await ProjectModel.updateMaterialQuantity(project_id, material_id, quantity);
    res.json(updatedMaterial);
  } catch (error) {
    console.error("Error updating material quantity:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getMaterialsByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const materials = await ProjectModel.getMaterialsByProjectId(project_id);
    res.json(materials);
  } catch (error) {
    console.error("Error fetching materials for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para manejar servicios en proyectos
const addServiceToProject = async (req, res) => {
  try {
    const { project_id, service_id, is_paid, status, end_date } = req.body;
    const newService = await ProjectModel.addServiceToProject({ project_id, service_id, is_paid, status, end_date });
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error adding service to project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const removeServiceFromProject = async (req, res) => {
  try {
    const { project_id, service_id } = req.params;
    await ProjectModel.removeServiceFromProject(project_id, service_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing service from project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getServicesByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const services = await ProjectModel.getServicesByProjectId(project_id);
    res.json(services);
  } catch (error) {
    console.error("Error fetching services for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para manejar fotos en proyectos
const addPhotoToProject = async (req, res) => {
  try {
    const { project_id, url } = req.body;
    const newPhoto = await ProjectModel.addPhotoToProject({ project_id, url });
    res.status(201).json(newPhoto);
  } catch (error) {
    console.error("Error adding photo to project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const removePhotoFromProject = async (req, res) => {
  try {
    const { photo_id } = req.params;
    await ProjectModel.removePhotoFromProject(photo_id);
    res.status(204).send();
  } catch (error) {
    console.error("Error removing photo from project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPhotosByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const photos = await ProjectModel.getPhotosByProjectId(project_id);
    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Función para recuperar el nombre del cliente a partir de la ID de la propuesta
const getClientNameByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const client = await ProjectModel.getClientNameByProjectId(project_id);
    res.json(client);
  } catch (error) {
    console.error("Error fetching client name:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
    
  }
};

const getTotalMaterialCostByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const totalMaterialCost = await ProjectModel.getTotalMaterialCostByProjectId(project_id);
    res.json({ total_material_cost: totalMaterialCost });
  } catch (error) {
    console.error("Error fetching total material cost:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const ProjectController = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  addEmployeeToProject,
  removeEmployeeFromProject,
  getEmployeesByProjectId,
  addMaterialToProject,
  removeMaterialFromProject,
  updateMaterialQuantity,
  getMaterialsByProjectId,
  addServiceToProject,
  removeServiceFromProject,
  getServicesByProjectId,
  addPhotoToProject,
  removePhotoFromProject,
  getPhotosByProjectId,
  getClientNameByProjectId,
  getTotalMaterialCostByProjectId
};