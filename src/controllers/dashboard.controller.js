import { DashboardModel } from '../models/dashboard.model.js';

const getDashboardData = async (req, res) => {
  try {
    const metrics = await DashboardModel.getDashboardMetrics();
    const recentClients = await DashboardModel.getRecentClients();
    const currentProjects = await DashboardModel.getCurrentProjects();
    const receivedProposals = await DashboardModel.getReceivedProposals();
    const billingAndPayments = await DashboardModel.getBillingAndPayments();

    res.status(200).json({
      metrics,
      recentClients,
      currentProjects,
      receivedProposals,
      billingAndPayments
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      ok: false,
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const DashboardController = {
  getDashboardData
};