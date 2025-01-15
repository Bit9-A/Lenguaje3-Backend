import { db } from "../database/conection.js";

// Operaciones CRUD para users
const createUser = async ({ email, password, phone, preferences, username, role_id, status, employee_id }) => {
  const query = {
    text: `
      INSERT INTO users (email, password, phone, preferences, username, role_id, status, employee_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, email, phone, preferences, username, role_id, status, employee_id
    `,
    values: [email, password, phone, preferences, username, role_id, status, employee_id]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const getAllUsers = async () => {
  const query = {
    text: 'SELECT id, email, phone, preferences, username, role_id, status, employee_id FROM users'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findUserById = async (id) => {
  const query = {
    text: 'SELECT id, email, phone, preferences, username, role_id, status, employee_id FROM users WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findUserByEmail = async (email) => {
  const query = {
    text: 'SELECT id, email, password, phone, preferences, username, role_id, status, employee_id FROM users WHERE email = $1',
    values: [email]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findUserByUsername = async (username) => {
  const query = {
    text: 'SELECT id, email, phone, preferences, username, role_id, status, employee_id FROM users WHERE username = $1',
    values: [username]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateUser = async (id, { email, phone, preferences, username, role_id, status, employee_id }) => {
  const query = {
    text: `
      UPDATE users
      SET email = $1, phone = $2, preferences = $3, username = $4, role_id = $5, status = $6, employee_id = $7
      WHERE id = $8
      RETURNING id, email, phone, preferences, username, role_id, status, employee_id
    `,
    values: [email, phone, preferences, username, role_id, status, employee_id, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateUserPassword = async (id, password) => {
  const query = {
    text: 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id',
    values: [password, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeUser = async (id) => {
  const query = {
    text: 'DELETE FROM users WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

const savePasswordResetToken = async (id, token, expiration) => {
  const query = {
    text: 'UPDATE users SET reset_token = $1, reset_token_expiration = $2 WHERE id = $3',
    values: [token, expiration, id]
  };
  await db.query(query);
};

const findUserByResetToken = async (token) => {
  const query = {
    text: 'SELECT * FROM users WHERE reset_token = $1',
    values: [token]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const clearPasswordResetToken = async (id) => {
  const query = {
    text: 'UPDATE users SET reset_token = NULL, reset_token_expiration = NULL WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

const saveLoginToken = async (id, token, expiration) => {
  const query = {
    text: 'UPDATE users SET login_token = $1, login_token_expiration = $2 WHERE id = $3',
    values: [token, expiration, id]
  };
  await db.query(query);
};

const findUserByLoginToken = async (token) => {
  const query = {
    text: 'SELECT * FROM users WHERE login_token = $1',
    values: [token]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const clearLoginToken = async (id) => {
  const query = {
    text: 'UPDATE users SET login_token = NULL, login_token_expiration = NULL WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Operaciones CRUD para user_roles
const createUserRole = async ({ role_name }) => {
  const query = {
    text: `
      INSERT INTO user_roles (role_name)
      VALUES ($1)
      RETURNING *
    `,
    values: [role_name]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllUserRoles = async () => {
  const query = {
    text: 'SELECT * FROM user_roles'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findUserRoleById = async (id) => {
  const query = {
    text: 'SELECT * FROM user_roles WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateUserRole = async (id, { role_name }) => {
  const query = {
    text: `
      UPDATE user_roles
      SET role_name = $1
      WHERE id = $2
      RETURNING *
    `,
    values: [role_name, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeUserRole = async (id) => {
  const query = {
    text: 'DELETE FROM user_roles WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const UserModel = {
  createUser,
  getAllUsers,
  findUserById,
  findUserByEmail,
  findUserByUsername,
  findUserByLoginToken,
  findUserByResetToken,
  saveLoginToken,
  updateUser,
  updateUserPassword,
  removeUser,
  savePasswordResetToken,
  findUserByResetToken,
  clearPasswordResetToken,
  createUserRole,
  findAllUserRoles,
  findUserRoleById,
  updateUserRole,
  removeUserRole
};