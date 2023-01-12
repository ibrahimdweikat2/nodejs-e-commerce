import express from 'express';
import {updateUser,deleteUser,getUser,getUsers,getStats} from '../Controllers/userControllers.js';
import verifyTokenAndAuthorization from '../Middleware/user.js'
import {verifyTokenAndAdmin} from '../Middleware/user.js';

const router=express.Router();

router.patch('/:id',verifyTokenAndAuthorization,updateUser);
router.delete('/delete/:id',verifyTokenAndAdmin,deleteUser);
router.get('/find/:id',verifyTokenAndAdmin,getUser);
router.get('/',verifyTokenAndAdmin,getUsers);
router.get('/stats',verifyTokenAndAdmin,getStats);


export default router;