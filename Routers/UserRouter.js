const UserModel=require("../Models/UserModel");
const express=require("express")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")
const VerificationModel=require("../Models/VerificationModel")
const router=express.Router()



router.post("/register", async(req, res)=>{

    const { name, surname, email, password, role}=req.body

   try{

    const user=await UserModel.findOne({email})

    if (user) {

        return res.status(400).json({ message: "Email already exists" });
      }
    const hashedPassword=await bcrypt.hash(password, 10)

    const newUser=new UserModel({name, surname, email, password:hashedPassword, role})
    
    await  newUser.save()

    const randomNumber=Math.floor(Math.random() * 9999);
      
    await VerificationModel.create({user:newUser._id, code: randomNumber})

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
    subject:"Email verification",
    text:"Use this code to verify your email " +randomNumber
})

res.send({id: newUser._id})

   }catch(e){

    res.status(400).send(e?.message)

   }

})


router.post("/verify-email", async(req,res)=>{

  const {code, user}=req.body

  if(!code) return res.status(400).send("Missing code")
    if(!user) return res.status(400).send("Missing user")

      try{
              const entry=await VerificationModel.findOne({code, user})
              if(!entry) return res.status(400).send("Code is incorrect")
              const _user=await UserModel.findById(user)
              if(!_user) return res.status(400).send("User not found")
              await UserModel.findByIdAndUpdate(user, {isVerified:true})
              await VerificationModel.findById(entry._id)
              await VerificationModel.findByIdAndDelete(entry._id)
              

              res.json("Email verified")

      }catch(e){

             res.status(400).send("Email verification failed")

      }

})



router.post("/login", async(req, res)=>{

const {email, password, role}=req.body
const user=await UserModel.findOne({email})

if (!user) {
    return res
      .status(400)
      .json({ message: "Email or password is incorrect" });
  }

    const isPasswordvalid=await bcrypt.compare(password, user.password)
    if (!isPasswordvalid) {
        return res
          .status(400)
          .json({ message: "Email or password is incorrect" });
      }

        const token=jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
        res.json({token, userID:user._id, role:user.role})


})

module.exports=router
