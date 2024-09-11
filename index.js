const express=require("express")
const mongoose=require("mongoose")
const {config}=require("dotenv")
const cors=require("cors")
const UserRouter=require("./Routers/UserRouter.js")
const AppointmentRouter=require("./Routers/AppointmentRouter.js")
const allappointmentss=require("./Routers/Admin.js")
const MessagesRouter=require("./Routers/MessagesRouter.js")
config()

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users", UserRouter)
app.use("/appointment", AppointmentRouter)
app.use("/messages", MessagesRouter)


  const startserver=()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("Server is running...")
    })
}

const connecttodatabase=async()=>{

await mongoose.connect(process.env.MONGO_DB)
console.log("Conneted to DataBase")
startserver()

}

connecttodatabase()