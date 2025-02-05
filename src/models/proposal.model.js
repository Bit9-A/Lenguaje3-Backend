import { db } from "../database/conection.js";

const create = async ({ client_id, proposal_description, budget_min, budget_max, status }) => {
  const query = {
    text: `
      INSERT INTO client_proposals (client_id, proposal_description, proposal_date, budget_min, budget_max, status)
      VALUES ($1, $2, CURRENT_DATE, $3, $4, $5)
      RETURNING id, client_id, proposal_description, proposal_date, budget_min, budget_max, status
    `,
    values: [client_id, proposal_description, budget_min, budget_max, status]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAll = async () => {
  const query = {
    text: 'SELECT id, client_id, proposal_description, proposal_date, budget_min, budget_max, status FROM client_proposals'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findById = async (id) => {
  const query = {
    text: 'SELECT id, client_id, proposal_description, proposal_date, budget_min, budget_max, status FROM client_proposals WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const findPendingProposals = async () => {
  const query = {
    text: `
      SELECT 
        cp.id, 
        cp.client_id, 
        CONCAT(c.firstname, ' ', c.lastname) AS client_name, 
        cp.proposal_description, 
        cp.proposal_date, 
        cp.budget_min, 
        cp.budget_max, 
        cp.status 
      FROM client_proposals cp
      JOIN clients c ON cp.client_id = c.id
      WHERE cp.status = $1
    `,
    values: ['Pending']
  };
  const { rows } = await db.query(query);
  return rows;
};

const update = async (id, { client_id, proposal_description, budget_min, budget_max, status }) => {
  const query = {
    text: `
      UPDATE client_proposals
      SET client_id = $1, proposal_description = $2, budget_min = $3, budget_max = $4, status = $5
      WHERE id = $6
      RETURNING id, client_id, proposal_description, proposal_date, budget_min, budget_max, status
    `,
    values: [client_id, proposal_description, budget_min, budget_max, status, id]
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

const updateProposalStatus = async (id, status) => {
  const query = {
    text: 'UPDATE client_proposals SET status = $1 WHERE id = $2 RETURNING *',
    values: [status, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

export const ProposalModel = {
  create,
  findAll,
  findById,
  findPendingProposals,
  update,
  remove,
  updateProposalStatus
};