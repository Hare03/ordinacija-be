const express=require("express")
const AppointmentModel=require("../Models/AppointmentModel")
const UserModel=require("../Models/UserModel")


const router=express.Router()


router.post("/", async (req,res)=>{


    try{

          const {name, surname, email, userID:userOwner}=req.body

          const response=await AppointmentModel.create({name, surname, email, userOwner })


          res.json({response, message:"Appointment created successfully"})


}catch(e){

          res.status(400).send(e?.message)
          
}

})

router.get("/:userID", async({params}, res)=>{

try{

    const {userID}=params

    if(!userID){
    
    return res.status(404).send("User is not defined")

    }

    const appointments=await AppointmentModel.find({userOwner: userID})
    res.json(appointments)

}catch(e){

    console.log(e)

}

})

router.get("/getall/appointments",  async(req, res)=>{

    try{

    const appointmentss=await AppointmentModel.find()

    res.json(appointmentss)
    
    }catch(e){

    res.status(400).send("Something went wrong")

    }
    
    })


        
    router.put("/update/appointments/:idd",async (req, res)=>{

        try{

            const id=req.params.idd

            const appointmentexist=await AppointmentModel.findById(id)

            if(!appointmentexist){

               return res.status(404).send("Appointment doesnt exist")
           }
               const updatedappointment=await AppointmentModel.findByIdAndUpdate(id, req.body ,{new:true})

               res.json(updatedappointment)

        }catch(e){

            res.status(500).send(e?.message)

        }
    })

   
    router.delete("/delete/appointments/:id", async(req,res)=>{
      try{

           const id=req.params.id

           const appointmentexist=await AppointmentModel.findById(id)

        if(!appointmentexist){

           return res.status(404).send("Appointment doesnt exist")

       }      

           await AppointmentModel.findByIdAndDelete(id)

           res.status(200).send("Appointment deleted successfully")

    }catch(e){
        
        res.status(500).send(e?.message)

      }
    })


module.exports=router