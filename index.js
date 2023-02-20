require("dotenv").config()
const express= require("express")
const cors= require("cors")
const { connection } = require("./config/db")
const { UserRouter } = require("./routes/UserRoutes")
const { BlogRouter } = require("./routes/BlogRoutes")
const { authenticate } = require("./Middleware/Authentication")

const app=express()
app.use(express.json())
app.use(cors())

app.use("/users", UserRouter)
app.use(authenticate)
app.use("/posts", BlogRouter)

app.get("/", (req,res)=>{
    console.log("Welcome ");
    res.send("Welcome ")
})
app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log(`Server connected ${process.env.port}`);
    }catch(err){
        console.log("Not connected");
    }
})