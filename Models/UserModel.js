const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    surname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        default:"userr"
    },
    
    isVerified:{
        type: Boolean,
        default: false
    }
})

const UserModel=mongoose.model("users", UserSchema)

module.exports=UserModel