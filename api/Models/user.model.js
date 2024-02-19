import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,

    },
    avatar:{
        type:String,
        default:"https://www.clipartmax.com/png/middle/417-4175735_system-administrator-svg-png-icon-free-download-man-icon.png"

    },
},{timestamps:true})

const User = mongoose.model('user',userSchema)

export default User;