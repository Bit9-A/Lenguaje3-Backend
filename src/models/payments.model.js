import { db } from "../database/conection.js";

// Operaciones CRUD para payments
const createPayment = async ({ amount, payment_date, project_id, payment_type_id, description, service_id, material_id }) => {
  const query = {
    text: `
      INSERT INTO payments (amount, payment_date, project_id, payment_type_id, description, service_id, material_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
    values: [amount, payment_date, project_id, payment_type_id, description, service_id, material_id]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllPayments = async () => {
  const query = {
    text: 'SELECT * FROM payments'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findPaymentById = async (id) => {
  const query = {
    text: 'SELECT * FROM payments WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updatePayment = async (id, { amount, payment_date, project_id, payment_type_id, description, service_id, material_id }) => {
  const query = {
    text: `
      UPDATE payments
      SET amount = $1, payment_date = $2, project_id = $3, payment_type_id = $4, description = $5, service_id = $6, material_id = $7
      WHERE id = $8
      RETURNING *
    `,
    values: [amount, payment_date, project_id, payment_type_id, description, service_id, material_id, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removePayment = async (id) => {
  const query = {
    text: 'DELETE FROM payments WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Operaciones CRUD para payment_types
const createPaymentType = async ({ name, description }) => {
  const query = {
    text: `
      INSERT INTO payment_types (name, description)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [name, description]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllPaymentTypes = async () => {
  const query = {
    text: 'SELECT * FROM payment_types'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findPaymentTypeById = async (id) => {
  const query = {
    text: 'SELECT * FROM payment_types WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updatePaymentType = async (id, { name, description }) => {
  const query = {
    text: `
      UPDATE payment_types
      SET name = $1, description = $2
      WHERE id = $3
      RETURNING *
    `,
    values: [name, description, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removePaymentType = async (id) => {
  const query = {
    text: 'DELETE FROM payment_types WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Consultas para servicios y materiales pagados y no pagados por proyectoconst findUnpaidServicesByProject = async (project_id) => {

const findUnpaidServicesByProject = async (project_id) => {
  const query = {
    text: `
      SELECT 
          ps.project_id,
          ps.service_id,
          s.name AS service_name,
          s.price AS service_price,
          ps.status,
          ps.is_paid
      FROM 
          public.project_services ps
      JOIN 
          public.services s ON ps.service_id = s.id
      WHERE 
          ps.project_id = $1 AND ps.is_paid = false
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findPaidServicesByProject = async (project_id) => {
  const query = {
    text: `
      SELECT 
          ps.project_id,
          ps.service_id,
          s.name AS service_name,
          s.price AS service_price,
          ps.status,
          ps.is_paid
      FROM 
          public.project_services ps
      JOIN 
          public.services s ON ps.service_id = s.id
      WHERE 
          ps.project_id = $1 AND ps.is_paid = true
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findUnpaidMaterialsByProject = async (project_id) => {
  const query = {
    text: `
      SELECT 
          mp.project_id,
          mp.material_id,
          m.name AS material_name,
          m.price*mp.quantity AS material_price,
          mp.quantity,
          mp.is_paid
      FROM 
          public.materials_project mp
      JOIN 
          public.materials m ON mp.material_id = m.id
      WHERE 
          mp.project_id = $1 AND mp.is_paid = false
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const findPaidMaterialsByProject = async (project_id) => {
  const query = {
    text: `
      SELECT 
          mp.project_id,
          mp.material_id,
          m.name AS material_name,
          m.price*mp.quantity AS material_price,
          mp.quantity,
          mp.is_paid
      FROM 
          public.materials_project mp
      JOIN 
          public.materials m ON mp.material_id = m.id
      WHERE 
          mp.project_id = $1 AND mp.is_paid = true
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows;
};

const calculateTotalCostByProjectId = async (project_id) => {
  const query = {
    text: `
      SELECT 
          COALESCE(SUM(s.price), 0) + COALESCE(SUM(m.price * mp.quantity), 0) AS total_cost
      FROM 
          public.projects p
      LEFT JOIN 
          public.project_services ps ON p.id = ps.project_id
      LEFT JOIN 
          public.services s ON ps.service_id = s.id
      LEFT JOIN 
          public.materials_project mp ON p.id = mp.project_id
      LEFT JOIN 
          public.materials m ON mp.material_id = m.id
      WHERE 
          p.id = $1
      GROUP BY 
          p.id, p.name;
    `,
    values: [project_id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};
const updateServicePaymentStatus = async (project_id, service_id, is_paid) => {
  const query = {
    text: `
      UPDATE public.project_services
      SET is_paid = $3
      WHERE project_id = $1 AND service_id = $2
      RETURNING *
    `,
    values: [project_id, service_id, is_paid]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateMaterialPaymentStatus = async (project_id, material_id, is_paid) => {
  const query = {
    text: `
      UPDATE public.materials_project
      SET is_paid = $3
      WHERE project_id = $1 AND material_id = $2
      RETURNING *
    `,
    values: [project_id, material_id, is_paid]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const PaymentModel = {
  createPayment,
  findAllPayments,
  findPaymentById,
  updatePayment,
  removePayment,
  createPaymentType,
  findAllPaymentTypes,
  findPaymentTypeById,
  updatePaymentType,
  removePaymentType,
  findUnpaidServicesByProject,
  findPaidServicesByProject,
  findUnpaidMaterialsByProject,
  findPaidMaterialsByProject,
  calculateTotalCostByProjectId,
  updateServicePaymentStatus,
  updateMaterialPaymentStatus
};