import { db } from "../database/conection.js"

const create = async ({ name, email, password, phone, address, preferences, username, role_id, status }) => {
  const query = {
    text: `
      INSERT INTO users (name, email, password, phone, address, preferences, username, role_id, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, name, email, phone, address, preferences, username, role_id, status
    `,
    values: [name, email, password, phone, address, preferences, username, role_id, status]
  }

  const { rows } = await db.query(query)
  return rows[0]
}

const findAll = async () => {
  const query = {
    text: 'SELECT id, name, email, phone, address, preferences, username, role_id, status FROM users'
  }
  const { rows } = await db.query(query)
  return rows
}

const findById = async (id) => {
  const query = {
    text: 'SELECT id, name, email, phone,password ,address, preferences, username, role_id, status FROM users WHERE id = $1',
    values: [id]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const findByEmail = async (email) => {
  const query = {
    text: 'SELECT id, name, email,password, phone, address, preferences, username, role_id, status FROM users WHERE email = $1',
    values: [email]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const findByUsername = async (username) => {
  const query = {
    text: 'SELECT id, name, email, phone, address, preferences, username, role_id, status FROM users WHERE username = $1',
    values: [username]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const update = async (id, { name, email, phone, address, preferences, username, role_id, status }) => {
  const query = {
    text: `
      UPDATE users
      SET name = $1, email = $2, phone = $3, address = $4, preferences = $5, username = $6, role_id = $7, status = $8
      WHERE id = $9
      RETURNING id, name, email, phone, address, preferences, username, role_id, status
    `,
    values: [name, email, phone, address, preferences, username, role_id, status, id]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const updatePassword = async (id, password) => {
  const query = {
    text: 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id',
    values: [password, id]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const remove = async (id) => {
  const query = {
    text: 'DELETE FROM users WHERE id = $1',
    values: [id]
  }
  await db.query(query)
}

const search = async (term) => {
  const query = {
    text: `
      SELECT id, name, email, phone, address, preferences, username, role_id, status
      FROM users
      WHERE name ILIKE $1 OR email ILIKE $1 OR username ILIKE $1
    `,
    values: [`%${term}%`]
  }
  const { rows } = await db.query(query)
  return rows
}

export const UserModel = {
  create,
  findAll,
  findById,
  findByEmail,
  findByUsername,
  update,
  updatePassword,
  remove,
  search
}