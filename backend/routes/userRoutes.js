import express from 'express';
const router = express.Router();
import  {registerUser,loginUser,getdata,updateProfile,searchRep,representativeProfile}  from '../controllers/userController.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getdata);
router.post('/editprofile/:id', updateProfile);
router.get('/', searchRep);
router.get('/representativeProfile/:id', representativeProfile);


export default router