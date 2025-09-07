import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true
        },
    email: {
        type:String,
        required:true,
        unique: true,
       },
    roomKey:{
        type:Number,
        required:true,
    }
});

const user = mongoose.model("User",userSchema);
export default user;