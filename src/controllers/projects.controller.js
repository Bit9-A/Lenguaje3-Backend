import { ProjectModel } from '../models/projects.model.js';
import { ProposalModel } from '../models/proposal.model.js';

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
    const { name, description, start_date, end_date, proposal_id } = req.body;
    const status = 'Planning';
    const is_paid = false;
    const newProject = await ProjectModel.createProject({ name, description, start_date, end_date, status, proposal_id, is_paid });

    await ProposalModel.updateProposalStatus(proposal_id, 'Approved');

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
    const { project_id, material_id, quantity, is_paid } = req.body;

    if (!project_id || !material_id || !quantity) {
      return res.status(400).json({
        msg: 'Project ID, Material ID, and Quantity are required'
      });
    }

    const newMaterial = await ProjectModel.addMaterialToProject({
      project_id,
      material_id,
      quantity,
      is_paid
    });

    res.status(201).json({
      msg: 'Material added to project successfully',
      material: newMaterial
    });
  } catch (error) {
    console.error("Error adding material to project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateMaterialQuantity = async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!id || !quantity) {
      return res.status(400).json({
        msg: 'Material ID and Quantity are required'
      });
    }

    const updatedMaterial = await ProjectModel.updateMaterialQuantity({
      id,
      quantity
    });

    res.status(200).json({
      msg: 'Material quantity updated successfully',
      material: updatedMaterial
    });
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
    res.json( materials );
  } catch (error) {
    console.error("Error fetching materials by project ID:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const removeMaterialFromProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: 'Material ID is required'
      });
    }

    const deletedMaterial = await ProjectModel.removeMaterialFromProject(id);

    if (!deletedMaterial) {
      return res.status(404).json({
        msg: 'Material not found'
      });
    }

    res.status(200).json({
      msg: 'Material removed from project successfully',
      material: deletedMaterial
    });
  } catch (error) {
    console.error("Error removing material from project:", error);
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
const getCalculateProjectProgress = async (req, res) => {
  try {
    const { project_id } = req.params;
    const progress = await ProjectModel.calculateProjectProgress(project_id);
    res.json({ progress });
  } catch (error) {
    console.error("Error fetching project progress:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const addProjectProgress = async (req, res) => {
  try {
    const { project_service_id, progress_description, visible, service_id } = req.body;

    if (!project_service_id || !progress_description || !service_id) {
      return res.status(400).json({
        msg: 'Project service ID, progress description, and service ID are required'
      });
    }

    const newProgress = await ProjectModel.addProjectProgress({
      project_service_id,
      progress_description,
      visible,
      service_id
    });

    res.status(201).json({
      msg: 'Project progress added successfully',
      progress: newProgress
    });
  } catch (error) {
    console.error("Error adding project progress:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateProjectProgress = async (req, res) => {
  try {
    const { id, progress_description, visible, service_id } = req.body;

    if (!id || !progress_description || !service_id) {
      return res.status(400).json({
        msg: 'Progress ID, progress description, and service ID are required'
      });
    }

    const updatedProgress = await ProjectModel.updateProjectProgress({
      id,
      progress_description,
      visible,
      service_id
    });

    res.status(200).json({
      msg: 'Project progress updated successfully',
      progress: updatedProgress
    });
  } catch (error) {
    console.error("Error updating project progress:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getProjectProgress = async (req, res) => {
  try {
    const { project_service_id } = req.params;
    const progress = await ProjectModel.getProjectProgress(project_service_id);
    res.json({ progress });
  } catch (error) {
    console.error("Error fetching project progress:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteProjectProgress = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        msg: 'Progress ID is required'
      });
    }

    const deletedProgress = await ProjectModel.deleteProjectProgress(id);

    if (!deletedProgress) {
      return res.status(404).json({
        msg: 'Progress not found'
      });
    }

    res.status(200).json({
      msg: 'Project progress deleted successfully',
      progress: deletedProgress
    });
  } catch (error) {
    console.error("Error deleting project progress:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};
const getServiceProgress = async (req, res) => {
  try {
    const { project_service_id, service_id } = req.params;
    const progress = await ProjectModel.getServiceProgress(project_service_id, service_id);
    res.json( progress );
  } catch (error) {
    console.error("Error fetching service progress:", error);
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
  getTotalMaterialCostByProjectId,
  getCalculateProjectProgress,
  addProjectProgress,
  updateProjectProgress,
  getProjectProgress,
  deleteProjectProgress,
  getServiceProgress
};