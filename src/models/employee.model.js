import { db } from "../database/conection.js";

// Operaciones CRUD para employees
const createEmployee = async ({ firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date }) => {
  const query = {
    text: `
      INSERT INTO employees (firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `,
    values: [firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllEmployees = async () => {
  const query = {
    text: 'SELECT * FROM employees'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findEmployeeById = async (id) => {
  const query = {
    text: 'SELECT * FROM employees WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findEmployeeByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM employees WHERE email = $1',
    values: [email]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateEmployee = async (id, { firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date }) => {
  const query = {
    text: `
      UPDATE employees
      SET firstname = $1, lastname = $2, email = $3, phone = $4, position = $5, schedule = $6, employee_type_id = $7, birthdate = $8, gender = $9, national_id = $10, hire_date = $11
      WHERE id = $12
      RETURNING *
    `,
    values: [firstname, lastname, email, phone, position, schedule, employee_type_id, birthdate, gender, national_id, hire_date, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeEmployee = async (id) => {
  const query = {
    text: 'DELETE FROM employees WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Operaciones CRUD para employee_types
const createEmployeeType = async ({ type_name }) => {
  const query = {
    text: `
      INSERT INTO employee_types (type_name)
      VALUES ($1)
      RETURNING *
    `,
    values: [type_name]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllEmployeeTypes = async () => {
  const query = {
    text: 'SELECT * FROM employee_types'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findEmployeeTypeById = async (id) => {
  const query = {
    text: 'SELECT * FROM employee_types WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateEmployeeType = async (id, { type_name }) => {
  const query = {
    text: `
      UPDATE employee_types
      SET type_name = $1
      WHERE id = $2
      RETURNING *
    `,
    values: [type_name, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeEmployeeType = async (id) => {
  const query = {
    text: 'DELETE FROM employee_types WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};
// Contar proyectos activos en los que trabaja un empleado
const countActiveProjectsByEmployeeId = async (employee_id) => {
  const query = {
    text: `
      SELECT COUNT(*) AS active_projects
      FROM project_employees
      JOIN projects ON project_employees.project_id = projects.id
      WHERE project_employees.employee_id = $1 AND projects.status = 'active'
    `,
    values: [employee_id]
  };
  const { rows } = await db.query(query);
  return rows[0].active_projects;
};

// Contar proyectos completados en los que ha trabajado un empleado
const countCompletedProjectsByEmployeeId = async (employee_id) => {
  const query = {
    text: `
      SELECT COUNT(*) AS completed_projects
      FROM project_employees
      JOIN projects ON project_employees.project_id = projects.id
      WHERE project_employees.employee_id = $1 AND projects.status = 'completed'
    `,
    values: [employee_id]
  };
  const { rows } = await db.query(query);
  return rows[0].completed_projects;
};
export const EmployeeModel = {
  createEmployee,
  findAllEmployees,
  findEmployeeById,
  findEmployeeByEmail,
  updateEmployee,
  removeEmployee,
  createEmployeeType,
  findAllEmployeeTypes,
  findEmployeeTypeById,
  updateEmployeeType,
  removeEmployeeType,
  countActiveProjectsByEmployeeId,
  countCompletedProjectsByEmployeeId
};