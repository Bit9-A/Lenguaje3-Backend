import { ProjectModel } from '../models/projects.model.js';

// Controladores para projects
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

    if (!name || !description || !proposal_id) {
      return res.status(400).json({
        msg: 'Name, description, and proposal ID are required'
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

// Métodos para obtener empleados, materiales, servicios, progreso y fotos de un proyecto específico
const getEmployeesByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const employees = await ProjectModel.findEmployeesByProjectId(project_id);

    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getMaterialsByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const materials = await ProjectModel.findMaterialsByProjectId(project_id);

    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching materials for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getServicesByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const services = await ProjectModel.findServicesByProjectId(project_id);

    res.status(200).json(services);
  } catch (error) {
    console.error("Error fetching services for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getProgressByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const progress = await ProjectModel.findProgressByProjectId(project_id);

    res.status(200).json(progress);
  } catch (error) {
    console.error("Error fetching progress for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPhotosByProjectId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const photos = await ProjectModel.findPhotosByProjectId(project_id);

    res.status(200).json(photos);
  } catch (error) {
    console.error("Error fetching photos for project:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Métodos para añadir, borrar y modificar empleados, materiales, servicios, progreso y fotos en un proyecto específico
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
  
  const addProgressToProject = async (req, res) => {
    try {
      const { project_id, progress_description, progress_date, visible } = req.body;
  
      if (!project_id || !progress_description || !progress_date) {
        return res.status(400).json({
          msg: 'Project ID, progress description, and progress date are required'
        });
      }
  
      const newProgress = await ProjectModel.addProgressToProject({
        project_id,
        progress_description,
        progress_date,
        visible
      });
  
      res.status(201).json({
        msg: 'Progress added to project successfully',
        progress: newProgress
      });
    } catch (error) {
      console.error("Error adding progress to project:", error);
      res.status(500).json({
        msg: 'Server Error',
        error: error.message
      });
    }
  };
  
  const removeProgressFromProject = async (req, res) => {
    try {
      const { id } = req.params;
  
      await ProjectModel.removeProgressFromProject(id);
  
      res.status(200).json({
        msg: 'Progress removed from project successfully'
      });
    } catch (error) {
      console.error("Error removing progress from project:", error);
      res.status(500).json({
        msg: 'Server Error',
        error: error.message
      });
    }
  };
  
  const addPhotoToProject = async (req, res) => {
    try {
      const { project_id, photo_url, description, taken_at } = req.body;
  
      if (!project_id || !photo_url || !description) {
        return res.status(400).json({
          msg: 'Project ID, photo URL, and description are required'
        });
      }
  
      const newPhoto = await ProjectModel.addPhotoToProject({
        project_id,
        photo_url,
        description,
        taken_at
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
      const { id } = req.params;
  
      await ProjectModel.removePhotoFromProject(id);
  
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
  
  export const ProjectController = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getEmployeesByProjectId,
    getMaterialsByProjectId,
    getServicesByProjectId,
    getProgressByProjectId,
    getPhotosByProjectId,
    addEmployeeToProject,
    removeEmployeeFromProject,
    addMaterialToProject,
    removeMaterialFromProject,
    addServiceToProject,
    removeServiceFromProject,
    addProgressToProject,
    removeProgressFromProject,
    addPhotoToProject,
    removePhotoFromProject
  };