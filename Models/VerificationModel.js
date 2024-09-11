const mongoose=require("mongoose")

const VerificationSchema=new mongoose.Schema({

code:{
    type: Number,
    required:true
},

user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"user"
}

})

const VerificationModel=mongoose.model("verificationcodes", VerificationSchema)

module.exports=VerificationModel