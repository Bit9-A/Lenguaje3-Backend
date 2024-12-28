import { db } from "../database/conection.js";

const create = async ({ firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status }) => {
  const query = {
    text: `
      INSERT INTO employees (firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id, firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status
    `,
    values: [firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: 'SELECT id, firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status FROM employees'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findById = async (id) => {
  const query = {
    text: 'SELECT id, firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status FROM employees WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findByEmail = async (email) => {
  const query = {
    text: 'SELECT id, firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status FROM employees WHERE email = $1',
    values: [email]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const update = async (id, { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status }) => {
  const query = {
    text: `
      UPDATE employees
      SET firstname = $1, lastname = $2, email = $3, phone = $4, position = $5, schedule = $6, employee_type_id = $7, birthdate = $8, gender = $9, national_id = $10, hire_date = $11, status = $12
      WHERE id = $13
      RETURNING id, firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status
    `,
    values: [firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, status, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const remove = async (id) => {
  const query = {
    text: 'DELETE FROM employees WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const EmployeeModel = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  remove
};