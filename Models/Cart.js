import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    products:[
        {
            productId:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity:{
                type: Number,
                default: 1
            },
            color:Object,
            size:Object
        }
    ]
},{timestamps:true});

export default mongoose.model('Cart', cartSchema);