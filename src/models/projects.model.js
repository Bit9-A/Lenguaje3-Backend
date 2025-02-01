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

// Operaciones para manejar servicios en proyectos
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

const getServicesByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT services.id, services.name, services.description, services.price, project_services.status, project_services.is_paid, project_services.end_date
      FROM services
      JOIN project_services ON services.id = project_services.service_id
      WHERE project_services.project_id = $1
    `,
    values: [project_id]
  };

  const { rows } = await db.query(query);
  return rows;
};

// Operaciones para manejar materiales en proyectos
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

const updateMaterialQuantity = async (project_id, material_id, quantity) => {
  const query = {
    text: `
      UPDATE materials_project
      SET quantity = $1
      WHERE project_id = $2 AND material_id = $3
      RETURNING *
    `,
    values: [quantity, project_id, material_id]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getMaterialsByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT materials.id, materials.name, materials.price, materials_project.quantity, (materials.price * materials_project.quantity) AS total_cost
      FROM materials
      JOIN materials_project ON materials.id = materials_project.material_id
      WHERE materials_project.project_id = $1
    `,
    values: [project_id]
  };

  const { rows } = await db.query(query);
  return rows;
};

// Operaciones para manejar empleados en proyectos
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

const getEmployeesByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT employees.id, employees.firstname, employees.lastname, employees.email, employees.phone, employees.position
      FROM employees
      JOIN project_employees ON employees.id = project_employees.employee_id
      WHERE project_employees.project_id = $1
    `,
    values: [project_id]
  };

  const { rows } = await db.query(query);
  return rows;
};

// Operaciones para manejar fotos en proyectos
const addPhotoToProject = async ({ project_id, url }) => {
  const query = {
    text: `
      INSERT INTO project_photos (project_id, url)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [project_id, url]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const removePhotoFromProject = async (photo_id) => {
  const query = {
    text: 'DELETE FROM project_photos WHERE id = $1',
    values: [photo_id]
  };
  await db.query(query);
};

// Función para recuperar el nombre del cliente a partir de la ID de la propuesta
const getClientNameByProposalId = async (proposal_id) => {
  const query = {
    text: `
      SELECT clients.firstname, clients.lastname
      FROM clients
      JOIN proposals ON clients.id = proposals.client_id
      WHERE proposals.id = $1
    `,
    values: [proposal_id]
  };

  const { rows } = await db.query(query);
  if (rows.length > 0) {
    return `${rows[0].firstname} ${rows[0].lastname}`;
  } else {
    return null;
  }
};

export const ProjectModel = {
  createProject,
  findAllProjects,
  findProjectById,
  updateProject,
  removeProject,
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