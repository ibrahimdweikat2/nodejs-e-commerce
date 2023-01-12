import express from 'express';
import {addProduct,getProduct,getProducts,updateProduct,deleteProduct} from '../Controllers/productControllers.js';
import {verifyTokenAndAdmin} from '../Middleware/user.js';
const router=express.Router();

router.post('/addproduct',verifyTokenAndAdmin,addProduct);
router.get('/find/:id',getProduct);
router.get('/',getProducts);
router.patch('/update/:id',verifyTokenAndAdmin,updateProduct);
router.delete('/delete/:id',verifyTokenAndAdmin,deleteProduct);

export default router;