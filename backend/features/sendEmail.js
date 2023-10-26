import nodemailer from "nodemailer";
import Otp from "../models/otpModel.js";
import { otpGenerator } from "./feature.js";
import User from "../models/userModel.js";

const sendEmail=async(req,res)=>{
    try{
        const {email}=req.body;

        let user=await User.findOne({email}).select("-password");
    
        if(!user) return res.status(500).send({success:false,message:"User Does not Exists"});

        let otp=otpGenerator();
    
        const otpFind=await Otp.findById(user._id);
    
        if(otpFind) await Otp.findByIdAndDelete(user._id);
    
        await Otp.create({_id:user._id,otpvalue:otp}); 
        
        let transporter=nodemailer.createTransport({
            service:"gmail",
            auth:{
              user:process.env.FROM_EMAIL,
              pass:process.env.FROM_PASSWORD
            }
        })
    
        let mailOptions={
            from:process.env.FROM_EMAIL,
            to:email,
            subject:"Forgot Password ",
            html:`Otp to Forgot Password is : <b>${otp}</b>`
        }
    
        await transporter.sendMail(mailOptions);
    
        res.status(200).json({success:true,message:"Email Sent successfully",user});
    }
    catch(error){
        res.status(500).json({success:false,message:"Error in Senting Email",error:error.message});
    }
}

export {sendEmail};