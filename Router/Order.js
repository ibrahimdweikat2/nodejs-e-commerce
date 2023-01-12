import express from 'express';
import {addOrder,getOrder,getOrders,updateOrder,deleteOrder,getIncome} from '../Controllers/orderControllers.js';
import verifyTokenAndAuthorization from '../Middleware/user.js'
import {verifyTokenAndAdmin,verifyToken} from '../Middleware/user.js';
const router=express.Router();

router.post('/addOrder',verifyToken,addOrder);
router.get('/find/:userId',verifyTokenAndAuthorization,getOrder);
router.get('/',verifyTokenAndAdmin,getOrders);
router.patch('/update/:id',verifyTokenAndAdmin,updateOrder);
router.delete('/delete/:id',verifyTokenAndAdmin,deleteOrder);
router.get('/income',verifyTokenAndAdmin,getIncome);

export default router;