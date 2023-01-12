import express from 'express';
import {addCart,getCart,getCarts,updateCart,deleteCart} from '../Controllers/cartCotrollers.js';
import verifyTokenAndAuthorization from '../Middleware/user.js'
import {verifyTokenAndAdmin,verifyToken} from '../Middleware/user.js';
const router=express.Router();

router.post('/addCart',verifyToken,addCart);
router.get('/find/:userId',verifyTokenAndAuthorization,getCart);
router.get('/',verifyTokenAndAdmin,getCarts);
router.patch('/update/:id',verifyTokenAndAuthorization,updateCart);
router.delete('/delete/:id',verifyTokenAndAuthorization,deleteCart);

export default router;