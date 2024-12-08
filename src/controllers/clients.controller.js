import { data } from "../data/data.js";

const getAllClients = async (req, res) => {
    try {
        let clients = data.clients;
        const { search } = req.query;

        if (search) {
            clients = clients.filter(client => 
                client.firstname.toLowerCase().includes(search.toLowerCase()) ||
                client.lastname.toLowerCase().includes(search.toLowerCase()) ||
                client.email.toLowerCase().includes(search.toLowerCase())
            );
        }

        res.status(200).json({
            ok: true,
            clients
        });
    } catch (error) {
        console.error("Error fetching clients:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getClientById = async (req, res) => {
    try {
        const { id } = req.params;
        const client = data.clients.find(client => client.id == id);

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found'
            });
        }

        res.status(200).json({
            ok: true,
            client
        });
    } catch (error) {
        console.error("Error fetching client:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getClientByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const client = data.clients.find(client => client.email.toLowerCase() === email.toLowerCase());

        if (!client) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found'
            });
        }

        res.status(200).json({
            ok: true,
            client
        });
    } catch (error) {
        console.error("Error fetching client by email:", error);
        res.status(500).json({
            ok: false,
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
                ok: false,
                msg: 'First name, last name, and email are required'
            });
        }

        const newClient = {
            id: (data.clients.length + 1).toString(),
            firstname,
            lastname,
            email,
            phone,
            address,
            birthdate,
            gender,
            national_id,
            status: "Active"
        };

        data.clients.push(newClient);

        res.status(201).json({
            ok: true,
            msg: 'Client created successfully',
            client: newClient
        });
    } catch (error) {
        console.error("Error creating client:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstname, lastname, email, phone, address, birthdate, gender, national_id, status } = req.body;

        const clientIndex = data.clients.findIndex(client => client.id == id);

        if (clientIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found'
            });
        }

        const updatedClient = {
            ...data.clients[clientIndex],
            firstname: firstname || data.clients[clientIndex].firstname,
            lastname: lastname || data.clients[clientIndex].lastname,
            email: email || data.clients[clientIndex].email,
            phone: phone || data.clients[clientIndex].phone,
            address: address || data.clients[clientIndex].address,
            birthdate: birthdate || data.clients[clientIndex].birthdate,
            gender: gender || data.clients[clientIndex].gender,
            national_id: national_id || data.clients[clientIndex].national_id,
            status: status || data.clients[clientIndex].status
        };

        data.clients[clientIndex] = updatedClient;

        res.status(200).json({
            ok: true,
            msg: 'Client updated successfully',
            client: updatedClient
        });
    } catch (error) {
        console.error("Error updating client:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const clientIndex = data.clients.findIndex(client => client.id == id);

        if (clientIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Client not found'
            });
        }

        data.clients.splice(clientIndex, 1);

        res.status(200).json({
            ok: true,
            msg: 'Client deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting client:", error);
        res.status(500).json({
            ok: false,
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