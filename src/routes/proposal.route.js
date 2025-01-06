import express from 'express';
import { ProposalController } from '../controllers/proposal.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.get('/', verifyToken, ProposalController.getAllProposals);
router.get('/:id', verifyToken, ProposalController.getProposalById);
router.post('/', verifyToken, ProposalController.createProposal);
router.put('/:id', verifyToken, ProposalController.updateProposal);
router.delete('/:id', verifyToken, ProposalController.deleteProposal);

export default router;