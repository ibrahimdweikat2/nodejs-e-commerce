import bodyParser from "body-parser";
import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from './Router/auth.js';
import userRouter from './Router/user.js';
import productRouter from './Router/Product.js';
import cartRouter from './Router/Cart.js';
import orderRouter from './Router/Order.js';
import stripeRouter from './Router/Payment.js';


const app = express();
dotenv.config();

app.use(bodyParser.json({limit:'40mb',extended:true}));
app.use(bodyParser.urlencoded({ limit:'40mb',extended: true }));
app.use(cors());

app.use('/api/auth',authRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/carts',cartRouter);
app.use('/api/orders',orderRouter);
app.use('/api/stripe',stripeRouter);

app.use('/api',(req,res)=>{
    res.send('APP IS RUNNING !');
})

app.listen(process.env.PORT || 5000);
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true,useUnifiedTopology:true})
.then(()=>console.log(`Server is listening on port ${process.env.PORT || 5000}`))
.catch(err => console.error(err));
