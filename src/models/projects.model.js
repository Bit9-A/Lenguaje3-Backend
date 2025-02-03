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

const findAllProjectsWithDetails = async () => {
  const query = {
    text: `
     SELECT 
        p.id, p.name, p.description, p.start_date, p.end_date, p.status, p.proposal_id, p.is_paid,
        CONCAT(c.firstname, ' ', c.lastname) AS client_name, c.email AS client_email,
        (SELECT COUNT(*) FROM project_employees pe WHERE pe.project_id = p.id) AS employee_count,
        (SELECT COUNT(*) FROM materials_project mp WHERE mp.project_id = p.id) AS material_count,
        (SELECT COUNT(*) FROM project_services ps WHERE ps.project_id = p.id) AS service_count
      FROM projects p
      LEFT JOIN client_proposals cp ON p.proposal_id = cp.id
      LEFT JOIN clients c ON cp.client_id = c.id
    `
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

const findProjectDetailsById = async (id) => {
  const query = {
    text: `
      SELECT 
        p.id, p.name, p.description, p.start_date, p.end_date, p.status, p.proposal_id, p.is_paid,
        c.firstname AS client_firstname, c.lastname AS client_lastname,
        (SELECT COUNT(*) FROM project_employees pe WHERE pe.project_id = p.id) AS employee_count,
        (SELECT COUNT(*) FROM materials_project mp WHERE mp.project_id = p.id) AS material_count,
        (SELECT COUNT(*) FROM project_services ps WHERE ps.project_id = p.id) AS service_count
      FROM projects p
      LEFT JOIN client_proposals cp ON p.proposal_id = cp.id
      LEFT JOIN clients c ON cp.client_id = c.id
      WHERE p.id = $1
    `,
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
      SELECT e.id, e.firstname, e.lastname, e.email, e.phone, e.position
      FROM project_employees pe
      JOIN employees e ON pe.employee_id = e.id
      WHERE pe.project_id = $1
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
      SELECT m.id, m.name, m.price, mp.quantity
      FROM materials_project mp
      JOIN materials m ON mp.material_id = m.id
      WHERE mp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
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
      SELECT s.id, s.name, s.description, s.price, ps.status, ps.end_date
      FROM project_services ps
      JOIN services s ON ps.service_id = s.id
      WHERE ps.project_id = $1
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
      INSERT INTO project_photos (project_id, photo_url)
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

const getPhotosByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT pp.id, pp.photo_url, pp.description, pp.taken_at
      FROM project_photos pp
      WHERE pp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

// Función para recuperar el nombre del cliente a partir de la ID de la propuesta
const getClientNameByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT CONCAT(c.firstname, ' ', c.lastname) AS fullname
      FROM projects p
      JOIN client_proposals cp ON p.proposal_id = cp.id
      JOIN clients c ON cp.client_id = c.id
      WHERE p.id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};
const getTotalMaterialCostByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT SUM(m.price * mp.quantity) AS total_material_cost
      FROM materials_project mp
      JOIN materials m ON mp.material_id = m.id
      WHERE mp.project_id = $1
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows[0].total_material_cost;
};

export const ProjectModel = {
  createProject,
  findAllProjects,
  findAllProjectsWithDetails,
  findProjectById,
  findProjectDetailsById,
  updateProject,
  removeProject,
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