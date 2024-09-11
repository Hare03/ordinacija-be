const mongoose=require("mongoose")

const AppointmentSchema=new mongoose.Schema({
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
    status:{
        type: String,
        default:"Na cekanju..."
    },
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})

const AppointmentModel=mongoose.model("appointments", AppointmentSchema)

module.exports=AppointmentModel