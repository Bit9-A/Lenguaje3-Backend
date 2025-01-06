import { db } from "../database/conection.js";

// Operaciones CRUD para projects
const createProject = async ({ name, description, start_date, end_date, status, proposal_id, is_paid }) => {
  const query = {
    text: `
      INSERT INTO projects (name, description, start_date, end_date, status, proposal_id, is_paid)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    values: [name, description, start_date, end_date, status, proposal_id, is_paid]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllProjects = async () => {
  const query = {
    text: 'SELECT * FROM projects'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findProjectById = async (id) => {
  const query = {
    text: 'SELECT * FROM projects WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateProject = async (id, { name, description, start_date, end_date, status, proposal_id, is_paid }) => {
  const query = {
    text: `
      UPDATE projects
      SET name = $1, description = $2, start_date = $3, end_date = $4, status = $5, proposal_id = $6, is_paid = $7
      WHERE id = $8
      RETURNING *
    `,
    values: [name, description, start_date, end_date, status, proposal_id, is_paid, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeProject = async (id) => {
  const query = {
    text: 'DELETE FROM projects WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Métodos para obtener empleados, materiales, servicios y otros detalles de un proyecto específico
const findEmployeesByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT e.*
      FROM employees e
      JOIN project_employees pe ON e.id = pe.employee_id
      WHERE pe.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findMaterialsByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT m.*
      FROM materials m
      JOIN materials_project mp ON m.id = mp.material_id
      WHERE mp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findServicesByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT s.*
      FROM services s
      JOIN project_services ps ON s.id = ps.service_id
      WHERE ps.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findProgressByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT pp.*
      FROM project_progress pp
      WHERE pp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findPhotosByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT pp.*
      FROM project_photos pp
      WHERE pp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

// Métodos para añadir, borrar y modificar empleados, materiales, servicios, progreso y fotos en un proyecto específico
const addEmployeeToProject = async ({ project_id, employee_id }) => {
    const query = {
      text: `
        INSERT INTO project_employees (project_id, employee_id)
        VALUES ($1, $2)
        RETURNING *
      `,
      values: [project_id, employee_id]
    };
  
    const { rows } = await db.query(query);
    return rows[0];
  };
  
  const removeEmployeeFromProject = async (project_id, employee_id) => {
    const query = {
      text: 'DELETE FROM project_employees WHERE project_id = $1 AND employee_id = $2',
      values: [project_id, employee_id]
    };
    await db.query(query);
  };
  
  const addMaterialToProject = async ({ project_id, material_id, quantity }) => {
    const query = {
      text: `
        INSERT INTO materials_project (project_id, material_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      values: [project_id, material_id, quantity]
    };
  
    const { rows } = await db.query(query);
    return rows[0];
  };
  
  const removeMaterialFromProject = async (project_id, material_id) => {
    const query = {
      text: 'DELETE FROM materials_project WHERE project_id = $1 AND material_id = $2',
      values: [project_id, material_id]
    };
    await db.query(query);
  };
  
  const addServiceToProject = async ({ project_id, service_id, is_paid, status, end_date }) => {
    const query = {
      text: `
        INSERT INTO project_services (project_id, service_id, is_paid, status, end_date)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      values: [project_id, service_id, is_paid, status, end_date]
    };
  
    const { rows } = await db.query(query);
    return rows[0];
  };
  
  const removeServiceFromProject = async (project_id, service_id) => {
    const query = {
      text: 'DELETE FROM project_services WHERE project_id = $1 AND service_id = $2',
      values: [project_id, service_id]
    };
    await db.query(query);
  };
  
  const addProgressToProject = async ({ project_id, progress_description, progress_date, visible }) => {
    const query = {
      text: `
        INSERT INTO project_progress (project_id, progress_description, progress_date, visible)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [project_id, progress_description, progress_date, visible]
    };
  
    const { rows } = await db.query(query);
    return rows[0];
  };
  
  const removeProgressFromProject = async (id) => {
    const query = {
      text: 'DELETE FROM project_progress WHERE id = $1',
      values: [id]
    };
    await db.query(query);
  };
  
  const addPhotoToProject = async ({ project_id, photo_url, description, taken_at }) => {
    const query = {
      text: `
        INSERT INTO project_photos (project_id, photo_url, description, taken_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [project_id, photo_url, description, taken_at]
    };
  
    const { rows } = await db.query(query);
    return rows[0];
  };
  
  const removePhotoFromProject = async (id) => {
    const query = {
      text: 'DELETE FROM project_photos WHERE id = $1',
      values: [id]
    };
    await db.query(query);
  };
  
  export const ProjectModel = {
    createProject,
    findAllProjects,
    findProjectById,
    updateProject,
    removeProject,
    findEmployeesByProjectId,
    findMaterialsByProjectId,
    findServicesByProjectId,
    findProgressByProjectId,
    findPhotosByProjectId,
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