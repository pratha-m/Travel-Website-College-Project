import mongoose, { Schema } from "mongoose";

const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("user",userSchema);

export default User;