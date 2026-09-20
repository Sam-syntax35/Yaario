import express from 'express';
import { createProfile } from '../controllers/profileController.js';

const router = express.Router();

router.post('/', createProfile);

export default router;
