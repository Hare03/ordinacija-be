const mongoose=require("mongoose")

const MyResponseSchema=new mongoose.Schema({
    odgovori:{
        type: String,
        required:true
    },
    responseto:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"

        }

})

const MyresponseModal=mongoose.model("myresponse", MyResponseSchema)

module.exports=MyresponseModal