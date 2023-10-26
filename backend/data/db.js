import mongoose from "mongoose";
const connectDb=()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{console.log("Database connection succeded")})
    .catch((error)=>{console.log("Erorr in connecting to database :"+error.message)})
}

export default connectDb;