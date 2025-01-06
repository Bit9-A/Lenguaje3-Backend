import { NotificationsAndInteractionsModel } from '../models/notifications.models.js';

// Controladores para notifications
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await NotificationsAndInteractionsModel.findAllNotifications();
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getNotificationById = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await NotificationsAndInteractionsModel.findNotificationById(id);

    if (!notification) {
      return res.status(404).json({
        msg: 'Notification not found'
      });
    }

    res.status(200).json(notification);
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createNotification = async (req, res) => {
  try {
    const { message, project_id } = req.body;

    if (!message || !project_id) {
      return res.status(400).json({
        msg: 'Message and project ID are required'
      });
    }

    const newNotification = await NotificationsAndInteractionsModel.createNotification({
      message,
      project_id
    });

    res.status(201).json({
      msg: 'Notification created successfully',
      notification: newNotification
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, project_id } = req.body;

    const updatedNotification = await NotificationsAndInteractionsModel.updateNotification(id, {
      message,
      project_id
    });

    if (!updatedNotification) {
      return res.status(404).json({
        msg: 'Notification not found'
      });
    }

    res.status(200).json({
      msg: 'Notification updated successfully',
      notification: updatedNotification
    });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await NotificationsAndInteractionsModel.findNotificationById(id);
    if (!notification) {
      return res.status(404).json({
        msg: 'Notification not found'
      });
    }

    await NotificationsAndInteractionsModel.removeNotification(id);

    res.status(200).json({
      msg: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

// Controladores para client_interactions
const getAllClientInteractions = async (req, res) => {
  try {
    const interactions = await NotificationsAndInteractionsModel.findAllClientInteractions();
    res.status(200).json(interactions);
  } catch (error) {
    console.error("Error fetching client interactions:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getClientInteractionById = async (req, res) => {
  try {
    const { id } = req.params;
    const interaction = await NotificationsAndInteractionsModel.findClientInteractionById(id);

    if (!interaction) {
      return res.status(404).json({
        msg: 'Client interaction not found'
      });
    }

    res.status(200).json(interaction);
  } catch (error) {
    console.error("Error fetching client interaction:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createClientInteraction = async (req, res) => {
  try {
    const { client_id, employee_id, interaction_date, notes } = req.body;

    if (!client_id || !employee_id || !interaction_date) {
      return res.status(400).json({
        msg: 'Client ID, employee ID, and interaction date are required'
      });
    }

    const newInteraction = await NotificationsAndInteractionsModel.createClientInteraction({
      client_id,
      employee_id,
      interaction_date,
      notes
    });

    res.status(201).json({
      msg: 'Client interaction created successfully',
      interaction: newInteraction
    });
  } catch (error) {
    console.error("Error creating client interaction:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateClientInteraction = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, employee_id, interaction_date, notes } = req.body;

    const updatedInteraction = await NotificationsAndInteractionsModel.updateClientInteraction(id, {
      client_id,
      employee_id,
      interaction_date,
      notes
    });

    if (!updatedInteraction) {
      return res.status(404).json({
        msg: 'Client interaction not found'
      });
    }

    res.status(200).json({
      msg: 'Client interaction updated successfully',
      interaction: updatedInteraction
    });
  } catch (error) {
    console.error("Error updating client interaction:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteClientInteraction = async (req, res) => {
  try {
    const { id } = req.params;

    const interaction = await NotificationsAndInteractionsModel.findClientInteractionById(id);
    if (!interaction) {
      return res.status(404).json({
        msg: 'Client interaction not found'
      });
    }

    await NotificationsAndInteractionsModel.removeClientInteraction(id);

    res.status(200).json({
      msg: 'Client interaction deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting client interaction:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const NotificationsAndInteractionsController = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getAllClientInteractions,
  getClientInteractionById,
  createClientInteraction,
  updateClientInteraction,
  deleteClientInteraction
};