import { ProjectModel } from '../models/projects.model.js';

const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAllProjects();
    res.status(200).json(projects);
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
    const project = await ProjectModel.findProjectById(id);

    if (!project) {
      return res.status(404).json({
        msg: 'Project not found'
      });
    }

    res.status(200).json(project);
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
    const { name, description, start_date, end_date, status, proposal_id, is_paid } = req.body;

    if (!name || !description || !start_date || !end_date || !status || !proposal_id) {
      return res.status(400).json({
        msg: 'All fields are required'
      });
    }

    const newProject = await ProjectModel.createProject({
      name,
      description,
      start_date,
      end_date,
      status,
      proposal_id,
      is_paid
    });

    res.status(201).json({
      msg: 'Project created successfully',
      project: newProject
    });
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
    const { name, description, start_date, end_date, status, proposal_id, is_paid } = req.body;

    const updatedProject = await ProjectModel.updateProject(id, {
      name,
      description,
      start_date,
      end_date,
      status,
      proposal_id,
      is_paid
    });

    if (!updatedProject) {
      return res.status(404).json({
        msg: 'Project not found'
      });
    }

    res.status(200).json({
      msg: 'Project updated successfully',
      project: updatedProject
    });
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

    const project = await ProjectModel.findProjectById(id);
    if (!project) {
      return res.status(404).json({
        msg: 'Project not found'
      });
    }

    await ProjectModel.removeProject(id);

    res.status(200).json({
      msg: 'Project deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting project:", error);
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

    if (!project_id || !service_id) {
      return res.status(400).json({
        msg: 'Project ID and service ID are required'
      });
    }

    const newService = await ProjectModel.addServiceToProject({
      project_id,
      service_id,
      is_paid,
      status,
      end_date
    });

    res.status(201).json({
      msg: 'Service added to project successfully',
      service: newService
    });
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

    res.status(200).json({
      msg: 'Service removed from project successfully'
    });
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

    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services for project:", error);
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

    if (!project_id || !material_id || !quantity) {
      return res.status(400).json({
        msg: 'Project ID, material ID, and quantity are required'
      });
    }

    const newMaterial = await ProjectModel.addMaterialToProject({
      project_id,
      material_id,
      quantity
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

const removeMaterialFromProject = async (req, res) => {
  try {
    const { project_id, material_id } = req.params;

    await ProjectModel.removeMaterialFromProject(project_id, material_id);

    res.status(200).json({
      msg: 'Material removed from project successfully'
    });
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
    const { project_id, material_id, quantity } = req.body;

    if (!project_id || !material_id || !quantity) {
      return res.status(400).json({
        msg: 'Project ID, material ID, and quantity are required'
      });
    }

    const updatedMaterial = await ProjectModel.updateMaterialQuantity(project_id, material_id, quantity);

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

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials for project:", error);
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

    res.status(200).json({
      msg: 'Employee removed from project successfully'
    });
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

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees for project:", error);
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

    if (!project_id || !url) {
      return res.status(400).json({
        msg: 'Project ID and URL are required'
      });
    }

    const newPhoto = await ProjectModel.addPhotoToProject({
      project_id,
      url
    });

    res.status(201).json({
      msg: 'Photo added to project successfully',
      photo: newPhoto
    });
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

    res.status(200).json({
      msg: 'Photo removed from project successfully'
    });
  } catch (error) {
    console.error("Error removing photo from project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controlador para recuperar el nombre del cliente a partir de la ID de la propuesta
const getClientNameByProposalId = async (req, res) => {
  try {
    const { proposal_id } = req.params;
    const clientName = await ProjectModel.getClientNameByProposalId(proposal_id);

    if (!clientName) {
      return res.status(404).json({
        msg: 'Client not found'
      });
    }

    res.status(200).json({ clientName });
  } catch (error) {
    console.error("Error fetching client name:", error);
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
  addServiceToProject,
  removeServiceFromProject,
  getServicesByProjectId,
  addMaterialToProject,
  removeMaterialFromProject,
  updateMaterialQuantity,
  getMaterialsByProjectId,
  addEmployeeToProject,
  removeEmployeeFromProject,
  getEmployeesByProjectId,
  addPhotoToProject,
  removePhotoFromProject,
  getClientNameByProposalId
};