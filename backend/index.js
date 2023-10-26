import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./data/db.js";
import userRouter from "./routes/userRouter.js";
import Razorpay from "razorpay";


const app=express();
const port=3001;

app.use(cors({
    origin:["http://localhost:3000"],
    credentials: true,
}));

app.use(cookieParser());

dotenv.config({
    path:"./data/config.env"
})

connectDb();

app.use(express.json());
app.use("/api/v1/user",userRouter);

app.post("/payment",async(req,res)=>{
    try{
        var instance = new Razorpay({ key_id: 'rzp_test_snWSRYhCKfQNs4', key_secret: 'D2vADyVuIYOLSQt9uvmMYbnm' })
        var options = {
           amount:req.body.amount*100,
           currency: "INR",
           receipt: "order_rcptid_11"
        };
        let order=await instance.orders.create(options); 
    
        res.status(200).send({
            success:"true",
            order:order
        })
    }
    catch(e){
        res.send({success:"false",error:"Some Error Occured"})
    }
})

app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})