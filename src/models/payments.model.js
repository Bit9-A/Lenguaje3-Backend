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
  removePaymentType
};