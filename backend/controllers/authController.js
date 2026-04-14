import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose'
import User from '../models/User.js'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
dotenv.config();
const key = process.env.JWT_KEY;

export const register = async (req,res)=>{
    console.log("recived data to store in db")
    try{
    const {name, email, pass} = req.body
    const present = await User.findOne({email})
    if(present){
        return res.status(400).json({
            message:"Email already exists"
        })
    }
    const password = await bcrypt.hash(pass,10)
    const user = await User.create({name,email,password})
    res.send({name:name,email:email,message:"Registered"})
        console.log("data stored and send the response")
    }catch(err){
        res.status(500).json({message:err.message})
    }
}


export const login = async (req,res)=>{
    try{
    const {email,pass}=req.body
    const user = await User.findOne({email})
    if(!user){
        return res.send({error:"User not found"})
    }
    const isMatch = await bcrypt.compare(pass,user.password)
    if(!isMatch) {
       return res.send({error: "Password do not match"})
    }
    const token = jwt.sign({
        id:user._id,
        name:user.name,
        email:user.email
    },key,{expiresIn:'1h'})
    res.json({
        user:user.name,
        message:"Successfully logged in",
        token:token
    })
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
