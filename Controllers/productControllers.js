import productSchema from '../Models/Produect.js'

export const addProduct=async (req,res)=>{
    const product=req.body;
    const newProduct=new productSchema(product);
    try {
        const result=await newProduct.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({message:error.message}); 
    }
}

export const getProduct=async (req,res)=>{
    try {
        const product=await productSchema.findById(req.params.id);
        if(!product) return res.status(404).json({message:"Product not found"});
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getProducts=async (req,res)=>{
    const qNew=req.query.new;
    const qCategories=req.query.categories;
    try {
        let products;
        if(qNew){
            products=await productSchema.find().sort({createdAt:-1}).limit(5);
        }else if(qCategories){
            products=await productSchema.find({categories:{
                $in:[qCategories]
            }})
        }
        else{
            products=await productSchema.find();
        }
        if(!products) return res.status(404).json({message:"Product not found"});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const updateProduct=async (req,res)=>{
    try {
        const updateProduct= await productSchema.findOneAndUpdate(req.params.id,{$set:req.body},{'new':true});
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteProduct=async (req,res)=>{
    try {
        await productSchema.findOneAndDelete(req.params.id);
        res.status(200).json({message: 'Product deleted successfully.'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
