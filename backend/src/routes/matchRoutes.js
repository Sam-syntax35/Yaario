import express from 'express';
import { getMatches } from '../controllers/matchController.js';

const router = express.Router();

router.get('/:profileId', getMatches);

export default router;
