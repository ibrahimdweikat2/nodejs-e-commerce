import OrderSchema from '../Models/Order.js'

export const addOrder=async (req,res)=>{
    const Order=req.body;
    const newOrder=new OrderSchema(Order);
    try {
        const result=await newOrder.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

export const getOrder=async (req,res)=>{
    try {
        const Order=await OrderSchema.find({userId:req.params.userId});
        if(!Order) return res.status(404).json({message:"Cart not found"});
        res.status(200).json(Cart);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getOrders=async (req,res)=>{
    try {
        const Orders=await OrderSchema.find();
        res.status(200).json(Orders);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateOrder=async (req,res)=>{
    try {
        const updateOrder= await OrderSchema.findOneAndUpdate(req.params.id,{$set:req.body},{'new':true});
        res.status(200).json(updateOrder);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteOrder=async (req,res)=>{
    try {
        await OrderSchema.findOneAndDelete(req.params.id);
        res.status(200).json({message: 'Order deleted successfully.'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getIncome=async (req,res)=>{
    const date=new Date();
    const lastMonth=new Date(date.setMonth(date.getMonth() -1));
    const previousMonth=new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income=await OrderSchema.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {$project:{
                month:{$month: "$createdAt"},
                sales:"$amount"
            }},
            {$group:{
                _id:"$month",
                total:{$sum:"$sales"}
            }}
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}