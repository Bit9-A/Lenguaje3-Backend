import { db } from "../database/conection.js";

// Operaciones CRUD para users
const createUser = async ({ name, email, password, phone, address, preferences, username, role_id, status }) => {
  const query = {
    text: `
      INSERT INTO users (name, email, password, phone, address, preferences, username, role_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, name, email, phone, address, preferences, username, role_id, status
    `,
    values: [name, email, password, phone, address, preferences, username, role_id, status]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllUsers = async () => {
  const query = {
    text: 'SELECT id, name, email, phone, address, preferences, username, role_id, status FROM users'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findUserById = async (id) => {
  const query = {
    text: 'SELECT id, name, email, phone, address, preferences, username, role_id, status FROM users WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findUserByUsername = async (username) => {
  const query = {
    text: 'SELECT id, name, email, phone, address, preferences, username, role_id, status FROM users WHERE username = $1',
    values: [username]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateUser = async (id, { name, email, phone, address, preferences, username, role_id, status }) => {
  const query = {
    text: `
      UPDATE users
      SET name = $1, email = $2, phone = $3, address = $4, preferences = $5, username = $6, role_id = $7, status = $8
      WHERE id = $9
      RETURNING id, name, email, phone, address, preferences, username, role_id, status
    `,
    values: [name, email, phone, address, preferences, username, role_id, status, id]
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
  findAllUsers,
  findUserById,
  findUserByUsername,
  updateUser,
  updateUserPassword,
  removeUser,
  createUserRole,
  findAllUserRoles,
  findUserRoleById,
  updateUserRole,
  removeUserRole
};