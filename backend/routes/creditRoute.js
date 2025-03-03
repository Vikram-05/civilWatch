import express from 'express';
const router = express.Router();
import {giveCredit,getSimilarRep} from '../controllers/creditController.js'

router.post('/', giveCredit);
router.get('/getSimilarRep/:id', getSimilarRep);

export default router