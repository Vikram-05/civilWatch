import express from 'express';
const router = express.Router();
import {createProblem,getProblem,deleteProblem,representativeProblem,problemUnderRep,updateStatus,getProblemData,updateIsSolved} from '../controllers/problemController.js'
import authenticate from '../middleware/authMiddleware.js';

router.post('/createProblem',authenticate, createProblem);
router.get('/:id', getProblem);
router.delete('/delete/:id', deleteProblem);
router.get('/representativeProblem/:id', representativeProblem);
router.get('/problemUnderRep/:id', problemUnderRep);
router.get('/getProblemData/:id',getProblemData)
router.put('/updateStatus/:id',updateStatus)
router.put('/updateIsSolved/:id',updateIsSolved)

export default router