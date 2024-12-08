import express from 'express';
import { verifyToken } from '../middlewares/jwt.middleware.js';
import { ProposalController } from '../controllers/proposal.controller.js';

const router = express.Router();

router.use(verifyToken);
router.get('/', ProposalController.getAllProposals);
router.get('/:id', ProposalController.getProposalById);
router.post('/', ProposalController.createProposal);
router.put('/:id', ProposalController.updateProposal);
router.delete('/:id', ProposalController.deleteProposal);

export default router;