import jwt from "jsonwebtoken";

const generateToken=(id)=>{
    const token=jwt.sign({_id:id},process.env.JWT_SECRET);
    return token;
}

export const otpGenerator=()=>{
    let otp="";
    const rand="0123456789abcdefghijklmnopqrstuvwxyz";
    for(let i=0;i<5;i++){
        otp+=rand[Math.floor(Math.random()*36)];
    }
    return otp;
}

export {generateToken};