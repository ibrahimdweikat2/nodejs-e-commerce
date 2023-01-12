import CartSchema from '../Models/Cart.js'

export const addCart=async (req,res)=>{
    const {productId,quantity,color,size}=req.body;
    try {
        const existingUserCart=await CartSchema.findOne({userId:req?.user?.id});
        let newCart;
        let result;
        if(existingUserCart){
            result= await CartSchema.findByIdAndUpdate(existingUserCart?.id,{userId:req?.user?.id,products:[...existingUserCart?.products,{productId,quantity,color,size}]},{new:true});
        }else{
            newCart=new CartSchema({userId:req?.user?.id,products:[{productId,quantity,color,size}]});
            result=await newCart.save();
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

export const getCart=async (req,res)=>{
    try {
        const Cart=await CartSchema.findOne({userId:req.params.userId});
        if(!Cart) return res.status(404).json({message:"Cart not found"});
        res.status(200).json(Cart);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getCarts=async (req,res)=>{
    try {
        const Carts=await CartSchema.find();
        res.status(200).json(Carts);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateCart=async (req,res)=>{
    try {
        const updateCart= await CartSchema.findOneAndUpdate(req.params.id,{$set:req.body},{'new':true});
        res.status(200).json(updateCart);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteCart=async (req,res)=>{
    try {
        await CartSchema.findOneAndDelete(req.params.id);
        res.status(200).json({message: 'Cart deleted successfully.'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// export const getStats=async (req,res)=>{
//     const date=new Date();
//     const lastMonth=new Date(date.setMonth(date.getMonth() -1));
//     const previousMonth=new Date(new Date(date.setMonth(new Date(lastMonth -1))));
// }