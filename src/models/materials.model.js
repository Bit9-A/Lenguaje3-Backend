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

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error creating material:', error);
    throw error;
  }
};

const findAllMaterials = async () => {
  const query = {
    text: 'SELECT * FROM materials'
  };

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching materials:', error);
    throw error;
  }
};

const findMaterialById = async (id) => {
  const query = {
    text: 'SELECT * FROM materials WHERE id = $1',
    values: [id]
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error fetching material by id:', error);
    throw error;
  }
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

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error updating material:', error);
    throw error;
  }
};

const removeMaterial = async (id) => {
  const query = {
    text: 'DELETE FROM materials WHERE id = $1',
    values: [id]
  };

  try {
    await db.query(query);
    return { message: 'Material deleted successfully' };
  } catch (error) {
    console.error('Error deleting material:', error);
    throw error;
  }
};

// Operaciones CRUD para material_types
const findAllMaterialTypes = async () => {
  const query = {
    text: 'SELECT * FROM material_types'
  };

  try {
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching material types:', error);
    throw error;
  }
};

const findMaterialTypeById = async (id) => {
  const query = {
    text: 'SELECT * FROM material_types WHERE id = $1',
    values: [id]
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error fetching material type by id:', error);
    throw error;
  }
};

const createMaterialType = async ({ name }) => {
  const query = {
    text: `
      INSERT INTO material_types (name)
      VALUES ($1)
      RETURNING *
    `,
    values: [name]
  };

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error creating material type:', error);
    throw error;
  }
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

  try {
    const { rows } = await db.query(query);
    return rows[0];
  } catch (error) {
    console.error('Error updating material type:', error);
    throw error;
  }
};

const removeMaterialType = async (id) => {
  const query = {
    text: 'DELETE FROM material_types WHERE id = $1',
    values: [id]
  };

  try {
    await db.query(query);
    return { message: 'Material type deleted successfully' };
  } catch (error) {
    console.error('Error deleting material type:', error);
    throw error;
  }
};

export {
  createMaterial,
  findAllMaterials,
  findMaterialById,
  updateMaterial,
  removeMaterial,
  findAllMaterialTypes,
  findMaterialTypeById,
  createMaterialType,
  updateMaterialType,
  removeMaterialType
};