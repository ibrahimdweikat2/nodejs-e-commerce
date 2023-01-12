import UserSchema from '../Models/User.js';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
export const registerUser=async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    try {
        const alreadyuser=await UserSchema.findOne({email});
        if (alreadyuser) return res.status(400).json({message:"Email already exists"});
        const hashPassword=CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString();
        const newUser=await UserSchema.create({username:`${firstName} ${lastName}`, email, password:hashPassword});
        res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}


export const loginUser=async (req, res) => {
    const {email} = req.body;
    try {
        const user=await UserSchema.findOne({email});
        if (!user) return res.status(404).json({message:"User not found"});
        const hashPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword=hashPassword.toString(CryptoJS.enc.Utf8);
        originalPassword !== req.body.password && res.status(401).json({message:"Incorrect password"});
        const {password,...other}=user._doc;
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_SECRET, {expiresIn: '3d'});
        res.status(200).json({...other,token});
    } catch (error) {

    }

}