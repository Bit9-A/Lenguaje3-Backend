import { ClientModel } from "../models/clients.model.js";

const getAllClients = async (req, res) => {
  try {
    const { search } = req.query;
    let clients;

    if (search) {
      clients = await ClientModel.search(search);
    } else {
      clients = await ClientModel.findAll();
    }

    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await ClientModel.findById(id);

    if (!client) {
      return res.status(404).json({
        msg: 'Client not found'
      });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getClientByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const client = await ClientModel.findByEmail(email);

    if (!client) {
      return res.status(404).json({
        msg: 'Client not found'
      });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client by email:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createClient = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, address, birthdate, gender, national_id } = req.body;

    if (!firstname || !lastname || !email) {
      return res.status(400).json({
        msg: 'First name, last name, and email are required'
      });
    }

    const newClient = await ClientModel.create({
      firstname,
      lastname,
      email,
      phone,
      address,
      birthdate,
      gender,
      national_id
    });

    res.status(201).json({
      msg: 'Client created successfully',
      client: newClient
    });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, phone, address, birthdate, gender, national_id } = req.body;

    const updatedClient = await ClientModel.update(id, {
      firstname,
      lastname,
      email,
      phone,
      address,
      birthdate,
      gender,
      national_id
    });

    if (!updatedClient) {
      return res.status(404).json({
        msg: 'Client not found'
      });
    }

    res.status(200).json({
      msg: 'Client updated successfully',
      client: updatedClient
    });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await ClientModel.findById(id);
    if (!client) {
      return res.status(404).json({
        msg: 'Client not found'
      });
    }

    await ClientModel.remove(id);

    res.status(200).json({
      msg: 'Client deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

export const ClientController = {
  getAllClients,
  getClientById,
  getClientByEmail,
  createClient,
  updateClient,
  deleteClient
};