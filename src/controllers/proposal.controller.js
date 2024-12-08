import { data } from "../data/data.js";

const getAllProposals = async (req, res) => {
    try {
        let proposals = data.client_proposals;
        const { search, status } = req.query;

        if (search) {
            proposals = proposals.filter(proposal => 
                proposal.proposal_description.toLowerCase().includes(search.toLowerCase()) ||
                proposal.client_id.toString().includes(search)
            );
        }

        if (status) {
            proposals = proposals.filter(proposal => proposal.status.toLowerCase() === status.toLowerCase());
        }

      
        const populatedProposals = proposals.map(proposal => {
            const client = data.clients.find(client => client.id === proposal.client_id);
            return {
                ...proposal,
                client: client ? { id: client.id, name: `${client.firstname} ${client.lastname}` } : null
            };
        });

        res.status(200).json({
            ok: true,
            proposals: populatedProposals
        });
    } catch (error) {
        console.error("Error fetching proposals:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const getProposalById = async (req, res) => {
    try {
        const { id } = req.params;
        const proposal = data.client_proposals.find(proposal => proposal.id === id);

        if (!proposal) {
            return res.status(404).json({
                ok: false,
                msg: 'Proposal not found'
            });
        }

        const client = data.clients.find(client => client.id === proposal.client_id);

        const populatedProposal = {
            ...proposal,
            client: client ? { id: client.id, name: `${client.firstname} ${client.lastname}` } : null
        };

        res.status(200).json({
            ok: true,
            proposal: populatedProposal
        });
    } catch (error) {
        console.error("Error fetching proposal:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const createProposal = async (req, res) => {
    try {
        const { client_id, proposal_description, budget_type_id, status = "Pending" } = req.body;

        if (!client_id || !proposal_description || !budget_type_id) {
            return res.status(400).json({
                ok: false,
                msg: 'Client ID, proposal description, and budget type are required'
            });
        }

        const newProposal = {
            id: Math.random().toString(36).substr(2, 9),
            client_id,
            proposal_description,
            proposal_date: new Date().toISOString().split('T')[0], 
            budget_type_id,
            status,
            comments: []
        };

        data.client_proposals.push(newProposal);

        res.status(201).json({
            ok: true,
            msg: 'Proposal created successfully',
            proposal: newProposal
        });
    } catch (error) {
        console.error("Error creating proposal:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const updateProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const { client_id, proposal_description, budget_type_id, status, comments } = req.body;

        const proposalIndex = data.client_proposals.findIndex(proposal => proposal.id === id);

        if (proposalIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Proposal not found'
            });
        }

        const updatedProposal = {
            ...data.client_proposals[proposalIndex],
            client_id: client_id || data.client_proposals[proposalIndex].client_id,
            proposal_description: proposal_description || data.client_proposals[proposalIndex].proposal_description,
            budget_type_id: budget_type_id || data.client_proposals[proposalIndex].budget_type_id,
            status: status || data.client_proposals[proposalIndex].status,
            comments: comments || data.client_proposals[proposalIndex].comments
        };

        data.client_proposals[proposalIndex] = updatedProposal;

        res.status(200).json({
            ok: true,
            msg: 'Proposal updated successfully',
            proposal: updatedProposal
        });
    } catch (error) {
        console.error("Error updating proposal:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

const deleteProposal = async (req, res) => {
    try {
        const { id } = req.params;
        const proposalIndex = data.client_proposals.findIndex(proposal => proposal.id === id);

        if (proposalIndex === -1) {
            return res.status(404).json({
                ok: false,
                msg: 'Proposal not found'
            });
        }

        data.client_proposals.splice(proposalIndex, 1);

        res.status(200).json({
            ok: true,
            msg: 'Proposal deleted successfully'
        });
    } catch (error) {
        console.error("Error deleting proposal:", error);
        res.status(500).json({
            ok: false,
            msg: 'Server Error',
            error: error.message
        });
    }
};

export const ProposalController = {
    getAllProposals,
    getProposalById,
    createProposal,
    updateProposal,
    deleteProposal
};