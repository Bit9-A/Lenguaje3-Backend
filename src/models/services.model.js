import { db } from "../database/conection.js";

const create = async ({ name, description, price }) => {
  const query = {
    text: `
      INSERT INTO services (name, description, price)
      VALUES ($1, $2, $3)
      RETURNING id, name, description, price
    `,
    values: [name, description, price]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: 'SELECT id, name, description, price FROM services'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findById = async (id) => {
  const query = {
    text: 'SELECT id, name, description, price FROM services WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const update = async (id, { name, description, price }) => {
  const query = {
    text: `
      UPDATE services
      SET name = $1, description = $2, price = $3
      WHERE id = $4
      RETURNING id, name, description, price
    `,
    values: [name, description, price, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const remove = async (id) => {
  const query = {
    text: 'DELETE FROM services WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const ServiceModel = {
  create,
  findAll,
  findById,
  update,
  remove
};