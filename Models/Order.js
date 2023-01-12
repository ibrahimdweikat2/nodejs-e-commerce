import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
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
            }
        }
    ],
    amount:{
        type: Number,
        require:true
    },
    address:{type:Object,required:true},
    statuses:{type:String,default:'Pending'}
},{timestamps:true});

export default mongoose.model('Order',OrderSchema);