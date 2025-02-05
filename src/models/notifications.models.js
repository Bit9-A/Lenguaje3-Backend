import { db } from "../database/conection.js";

// Operaciones CRUD para notifications
const createNotification = async ({ message, project_id }) => {
  const query = {
    text: `
      INSERT INTO notifications (message, project_id)
      VALUES ($1, $2)
      RETURNING *
    `,
    values: [message, project_id]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllNotifications = async () => {
  const query = {
    text: 'SELECT * FROM notifications'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findNotificationById = async (id) => {
  const query = {
    text: 'SELECT * FROM notifications WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateNotification = async (id, { message, project_id }) => {
  const query = {
    text: `
      UPDATE notifications
      SET message = $1, project_id = $2
      WHERE id = $3
      RETURNING *
    `,
    values: [message, project_id, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeNotification = async (id) => {
  const query = {
    text: 'DELETE FROM notifications WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

// Operaciones CRUD para client_interactions
const createClientInteraction = async ({ client_id, employee_id, interaction_date, notes }) => {
  const query = {
    text: `
      INSERT INTO client_interactions (client_id, employee_id, interaction_date, notes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
    values: [client_id, employee_id, interaction_date, notes]
  };

  const { rows } = await db.query(query);
  return rows[0];
};

const findAllClientInteractions = async () => {
  const query = {
    text: 'SELECT * FROM client_interactions'
  };
  const { rows } = await db.query(query);
  return rows;
};

const findClientInteractionById = async (id) => {
  const query = {
    text: 'SELECT * FROM client_interactions WHERE id = $1',
    values: [id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const updateClientInteraction = async (id, { client_id, employee_id, interaction_date, notes }) => {
  const query = {
    text: `
      UPDATE client_interactions
      SET client_id = $1, employee_id = $2, interaction_date = $3, notes = $4
      WHERE id = $5
      RETURNING *
    `,
    values: [client_id, employee_id, interaction_date, notes, id]
  };
  const { rows } = await db.query(query);
  return rows[0];
};

const removeClientInteraction = async (id) => {
  const query = {
    text: 'DELETE FROM client_interactions WHERE id = $1',
    values: [id]
  };
  await db.query(query);
};

export const NotificationsAndInteractionsModel = {
  createNotification,
  findAllNotifications,
  findNotificationById,
  updateNotification,
  removeNotification,
  createClientInteraction,
  findAllClientInteractions,
  findClientInteractionById,
  updateClientInteraction,
  removeClientInteraction,
};