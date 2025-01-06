import { db } from "../database/conection.js";

const create = async ({ client_id, proposal_description, budget, status }) => {
  const query = {
    text: `
      INSERT INTO client_proposals (client_id, proposal_description, proposal_date, budget, status)
      VALUES ($1, $2, CURRENT_DATE, $3, $4)
      RETURNING id, client_id, proposal_description, proposal_date, budget, status
    `,
    values: [client_id, proposal_description, budget, status]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: 'SELECT id, client_id, proposal_description, proposal_date, budget, status FROM client_proposals'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findById = async (id) => {
  const query = {
    text: 'SELECT id, client_id, proposal_description, proposal_date, budget, status FROM client_proposals WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const update = async (id, { client_id, proposal_description, budget, status }) => {
  const query = {
    text: `
      UPDATE client_proposals
      SET client_id = $1, proposal_description = $2, budget = $3, status = $4
      WHERE id = $5
      RETURNING id, client_id, proposal_description, proposal_date, budget, status
    `,
    values: [client_id, proposal_description, budget, status, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const remove = async (id) => {
  const query = {
    text: 'DELETE FROM client_proposals WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const ProposalModel = {
  create,
  findAll,
  findById,
  update,
  remove
};