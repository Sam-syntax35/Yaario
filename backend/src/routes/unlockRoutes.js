import express from 'express';
import { getUnlockedMatches } from '../controllers/unlockController.js';

const router = express.Router();

router.get('/:profileId/unlocked', getUnlockedMatches);

export default router;
