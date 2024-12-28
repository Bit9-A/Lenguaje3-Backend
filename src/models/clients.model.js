import { db } from "../database/conection.js"

const create = async ({ firstname, lastname, email, phone, address, birthdate, gender, national_id }) => {
  const query = {
    text: `
      INSERT INTO clients (firstname, lastname, email, phone, address, birthdate, gender, national_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
    values: [firstname, lastname, email, phone, address, birthdate, gender, national_id]
  }

  const { rows } = await db.query(query)
  return rows[0]
}

const findAll = async () => {
  const query = {
    text: 'SELECT * FROM clients'
  }
  const { rows } = await db.query(query)
  return rows
}

const findById = async (id) => {
  const query = {
    text: 'SELECT * FROM clients WHERE id = $1',
    values: [id]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const findByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM clients WHERE email = $1',
    values: [email]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const update = async (id, { firstname, lastname, email, phone, address, birthdate, gender, national_id }) => {
  const query = {
    text: `
      UPDATE clients
      SET firstname = $1, lastname = $2, email = $3, phone = $4, address = $5, birthdate = $6, gender = $7, national_id = $8
      WHERE id = $9
      RETURNING *
    `,
    values: [firstname, lastname, email, phone, address, birthdate, gender, national_id, id]
  }
  const { rows } = await db.query(query)
  return rows[0]
}

const remove = async (id) => {
  const query = {
    text: 'DELETE FROM clients WHERE id = $1',
    values: [id]
  }
  await db.query(query)
}

const search = async (term) => {
  const query = {
    text: `
      SELECT *
      FROM clients
      WHERE firstname ILIKE $1 OR lastname ILIKE $1 OR email ILIKE $1
    `,
    values: [`%${term}%`]
  }
  const { rows } = await db.query(query)
  return rows
}

export const ClientModel = {
  create,
  findAll,
  findById,
  findByEmail,
  update,
  remove,
  search
}