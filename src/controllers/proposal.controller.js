import { ProposalModel } from '../models/proposal.model.js';

const getAllProposals = async (req, res) => {
  try {
    const { search, status } = req.query;
    let proposals = await ProposalModel.findAll();

    if (search) {
      proposals = proposals.filter(proposal => 
        proposal.proposal_description.toLowerCase().includes(search.toLowerCase()) ||
        proposal.client_id.toString().includes(search)
      );
    }

    if (status) {
      proposals = proposals.filter(proposal => proposal.status.toLowerCase() === status.toLowerCase());
    }

    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching proposals:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getProposalById = async (req, res) => {
  try {
    const { id } = req.params;
    const proposal = await ProposalModel.findById(id);

    if (!proposal) {
      return res.status(404).json({
        msg: 'Proposal not found'
      });
    }

    res.status(200).json(proposal);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const createProposal = async (req, res) => {
  try {
    const { client_id, proposal_description, budget_min, budget_max, status = "Pending" } = req.body;

    if (!client_id || !proposal_description || budget_min === undefined || budget_max === undefined) {
      return res.status(400).json({
        msg: 'Client ID, proposal description, budget_min, and budget_max are required'
      });
    }

    const newProposal = await ProposalModel.create({
      client_id,
      proposal_description,
      budget_min,
      budget_max,
      status
    });

    res.status(201).json({
      msg: 'Proposal created successfully',
      proposal: newProposal
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const updateProposal = async (req, res) => {
  try {
    const { id } = req.params;
    const { client_id, proposal_description, budget, status } = req.body;

    const updatedProposal = await ProposalModel.update(id, {
      client_id,
      proposal_description,
      budget,
      status
    });

    if (!updatedProposal) {
      return res.status(404).json({
        msg: 'Proposal not found'
      });
    }

    res.status(200).json({
      msg: 'Proposal updated successfully',
      proposal: updatedProposal
    });
  } catch (error) {
    console.error("Error updating proposal:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const deleteProposal = async (req, res) => {
  try {
    const { id } = req.params;

    const proposal = await ProposalModel.remove(id);
    if (!proposal) {
      return res.status(404).json({
        msg: 'Proposal not found'
      });
    }

    await ProposalModel.remove(id);

    res.status(200).json({
      msg: 'Proposal deleted successfully'
    });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    res.status(500).json({
      msg: 'Server Error',
      error: error.message
    });
  }
};

const getPendingProposals = async (req, res) => {
  try {
    const proposals = await ProposalModel.findPendingProposals();
    res.json(proposals);
  } catch (error) {
    console.error("Error fetching pending proposals:", error);
    res.status(500).json({
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
  deleteProposal,
  getPendingProposals
};