import { generateToken } from "../features/feature.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";


const createUser=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password) return res.status(500).send({success:false,message:"Enter All Credentials"});
     
        let user=await User.findOne({email});
     
        if(user) return res.status(500).send({success:false,message:"User Already Exists"});
     
        user=await User.create({name,email,password});
         
        res.cookie("MAPIT_USER_TOKEN",generateToken(user._id),{
            httpOnly:false,
            secure:false,
            path:"/",
            withCredentials:true,
            maxAge:3*24*60*60*1000
        })
        res.status(200).send({success:true,message:"User created",user:user})
    }
    catch(error){
        res.status(500).send({success:false,message:error.message});
    }
}
const loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
         
        const user=await User.findOne({email});
    
        if(!user) return res.status(500).send({success:false,message:"User Not found"});
    
        const passMatch=user.password==password;
    
        if(!passMatch) return res.status(500).send({success:false,message:"Wrong pass"}); 

        const token=generateToken(user._id);

        res.cookie("MAPIT_USER_TOKEN",token,{
            httpOnly:false,
            secure:false,
            path:"/",
            withCredentials:true,
            maxAge:3*24*60*60*1000
        })
    
        res.status(200).send({success:true,message:"Logged in",user:{name:user.name,email:user.email,_id:user._id}});
    }
    catch(error){
        res.status(500).send({success:false,message:error.message});
    }
}
const getUserProfile=async(req,res)=>{
    try{
        const user=await User.findById(req.userId).select("-password");

        if(!user){
            res.cookie("MAPIT_USER_TOKEN","",{expires:new Date(0)});
            return res.status(500).send({success:false,message:"User Not Found"});
        } 

        res.status(200).send({success:true,message:"Cookie Found",user:user})
    }
    catch(error){
        res.status(500).send({success:false,message:error.message});
    }
}
const updateUserProfile=async(req,res)=>{
    try{

        const user=await User.findById(req.userId);
    
        if(!user){
            res.cookie("MAPIT_USER_TOKEN","",{expires:new Date(0)});
    
            return res.status(401).send({success:false,message:"Account Not Found"});
        } 
    
        const {name,email,password}=req.body;
    
        user.name=name || user.name;
        user.email=email || user.email;
        user.password=password || user.password;
    
        const updateUser=await user.save();
    
        res.status(200).send({success:true,message:"Updated User Profile",user:{
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email
        }});
    }
    catch(error){
        res.status(500).send({success:false,message:error.message});
    }
}
const userExists=async(req,res)=>{
    try{
        const {email}=req.body;
    
        let user=await User.findOne({email}).select("-password");
    
        if(!user) return res.status(500).send({success:false,message:"User Doesnot Exists"});

        res.status(200).send({success:true,message:"User Exists",user:user})
    }
    catch(error){
        return res.status(500).send({success:false,message:error.message})
    }
}
const checkOtp=async(req,res,next)=>{
    try{
        const {otp,userId}=req.body;
    
        const otpFind=await Otp.findById(userId);
    
        if(!otpFind) return res.status(401).send({success:false,message:"Otp is Expired"});;
    
        if(otpFind.otpvalue!==otp) return res.status(401).send({success:false,message:"Wrong Otp"})
    
        res.status(200).send({success:true,message:"Otp is correct"});
    }
    catch(error){
        res.status(500).send({success:false,message:error.message});   
    }
}
const changePassword=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        
        const user=await User.findOne({email});
    
        if(!user) return res.status(401).send({success:false,message:"User does not Exists"});
    
        user.password=password || user.password;
    
        await user.save();
    
        res.status(200).send({success:true,message:"Password Changed Successfully"});
    }
    catch(error){
        res.status(500).send({success:true,message:"Error in changing Password"});
    }
}



export {createUser,loginUser,getUserProfile,updateUserProfile,checkOtp,changePassword,userExists};