const mongoose=require("mongoose")

const MessagesSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    purpose:{
        type: String,
        required:true
    },
    yourmessage:{
        type: String,
        required:true
    },

    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const MessagesModel=mongoose.model("messages", MessagesSchema)

module.exports=MessagesModel