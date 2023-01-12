import UserSchema from '../Models/User.js';
import CryptoJS from 'crypto-js';

export const updateUser = async (req, res) => {
    if(req.body.password){
        req.body.password =CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    try {
        const updateUser= await UserSchema.findOneAndUpdate(req.params.id,{$set:req.body},{'new':true});
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const deleteUser= async (req, res) => {
    try {
        await UserSchema.findOneAndDelete(req.params.id);
        res.status(200).json({message: 'User deleted successfully.'});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const getUser=async (req, res) => {
    try {
        const user=await UserSchema.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found.'});
        const {password,...other}=user._doc;
        res.status(200).json(other);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getUsers=async (req, res) => {
    const query=req.query.new;  
    try {
        const users=query? await UserSchema.find().sort({_id:-1}):await UserSchema.find();
        if(!users) return res.status(404).json({message: 'User not found.'});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


export const getStats=async (req, res) => {
    const date=new Date();
    const lastYear=new Date(date.setFullYear(date.getFullYear()-1));
    try {
        const data=await UserSchema.aggregate([
        {$match:{createdAt:{$gte:lastYear}}},
        {$project:{
                month:{$month:"$createdAt"}
            }
        },
            {$group:{
                _id:"$month",
                total:{$sum:1}}}
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}