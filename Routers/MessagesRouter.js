const express=require("express")
const UserModel=require("../Models/UserModel")
const MessagesModel = require("../Models/MessagesModel")
const nodemailer=require("nodemailer")
const MyresponseModal=require("../Models/MyresponseModal")



const router=express.Router()


router.post("/message", async(req, res)=>{


try{
    const {name, email, purpose, yourmessage, userID:userOwner}=req.body
    const message=await MessagesModel.create({name, email, purpose, yourmessage, userOwner})

    res.json(message)

}catch(e){
    
    res.status(400).send(e?.message)

}


})


router.post("/response", async(req,res)=>{
const {email, odgovori}=req.body

try{

     await MyresponseModal.create({odgovori})

     const transporter=nodemailer.createTransport({

        service:"gmail",
        auth:{
            user:process.env.GMAIL_USER,
            pass:process.env.GMAIL_PASS
        }
    })
           
    await transporter.sendMail({

        from: process.env.GMAIL_USER,
        to:email,
        subject:"Odgovor",
        text:odgovori
    })


}catch(e){

    res.status(400).send(e?.message)
}

})

router.get("/allmessages", async(req,res)=>{

try{

    const allmessages=await MessagesModel.find()

    res.json(allmessages)

}catch(e){

    res.status(400).send("Something went wrong")
}

})

module.exports=router
