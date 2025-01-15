import { db } from "../database/conection.js";

const getDashboardMetrics = async () => {
  const activeProjectsQuery = {
    text: 'SELECT COUNT(*) FROM projects WHERE status = $1',
    values: ['In Progress']
  };
  const completedProjectsQuery = {
    text: 'SELECT COUNT(*) FROM projects WHERE status = $1',
    values: ['Completed']
  };
  const totalClientsQuery = {
    text: 'SELECT COUNT(*) FROM clients'
  };
  const totalRevenueQuery = {
    text: 'SELECT SUM(amount) FROM payments'
  };

  const activeProjectsResult = await db.query(activeProjectsQuery);
  const completedProjectsResult = await db.query(completedProjectsQuery);
  const totalClientsResult = await db.query(totalClientsQuery);
  const totalRevenueResult = await db.query(totalRevenueQuery);

  return {
    activeProjects: parseInt(activeProjectsResult.rows[0].count, 10),
    completedProjects: parseInt(completedProjectsResult.rows[0].count, 10),
    totalClients: parseInt(totalClientsResult.rows[0].count, 10),
    totalRevenue: totalRevenueResult.rows[0].sum ? parseFloat(totalRevenueResult.rows[0].sum) : 0
  };
};

const getRecentClients = async () => {
  const query = {
    text: 'SELECT * FROM clients ORDER BY created_at DESC LIMIT 5'
  };
  const { rows } = await db.query(query);
  return rows;
};

const getCurrentProjects = async () => {
  const query = {
    text: 'SELECT * FROM projects WHERE status = $1',
    values: ['In Progress']
  };
  const { rows } = await db.query(query);
  return rows;
};

const getReceivedProposals = async () => {
  const query = {
    text: 'SELECT * FROM client_proposals ORDER BY proposal_date DESC LIMIT 5'
  };
  const { rows } = await db.query(query);
  return rows;
};

const getBillingAndPayments = async () => {
  const query = {
    text: 'SELECT * FROM payments ORDER BY payment_date DESC LIMIT 5'
  };
  const { rows } = await db.query(query);
  return rows;
};

export const DashboardModel = {
  getDashboardMetrics,
  getRecentClients,
  getCurrentProjects,
  getReceivedProposals,
  getBillingAndPayments
};