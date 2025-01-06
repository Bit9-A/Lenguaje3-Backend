import { db } from "../database/conection.js";

// Operaciones CRUD para materials
const createMaterial = async ({ name, price, material_type_id }) => {
  const query = {
    text: `
      INSERT INTO materials (name, price, material_type_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
    values: [name, price, material_type_id]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllMaterials = async () => {
  const query = {
    text: 'SELECT * FROM materials'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findMaterialById = async (id) => {
  const query = {
    text: 'SELECT * FROM materials WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateMaterial = async (id, { name, price, material_type_id }) => {
  const query = {
    text: `
      UPDATE materials
      SET name = $1, price = $2, material_type_id = $3
      WHERE id = $4
      RETURNING *
    `,
    values: [name, price, material_type_id, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeMaterial = async (id) => {
  const query = {
    text: 'DELETE FROM materials WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Operaciones CRUD para material_types
const createMaterialType = async ({ name }) => {
  const query = {
    text: `
      INSERT INTO material_types (name)
      VALUES ($1)
      RETURNING *
    `,
    values: [name]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllMaterialTypes = async () => {
  const query = {
    text: 'SELECT * FROM material_types'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findMaterialTypeById = async (id) => {
  const query = {
    text: 'SELECT * FROM material_types WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateMaterialType = async (id, { name }) => {
  const query = {
    text: `
      UPDATE material_types
      SET name = $1
      WHERE id = $2
      RETURNING *
    `,
    values: [name, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeMaterialType = async (id) => {
  const query = {
    text: 'DELETE FROM material_types WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const MaterialModel = {
  createMaterial,
  findAllMaterials,
  findMaterialById,
  updateMaterial,
  removeMaterial,
  createMaterialType,
  findAllMaterialTypes,
  findMaterialTypeById,
  updateMaterialType,
  removeMaterialType
};