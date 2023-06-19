

const express = require('express')
const cors = require("cors");
const app = express()
const {connection} = require("./connection/connection");
const userRouter = require("./Routes/user.router");
const {cartRoute} = require("./Routes/product.route")
app.use(express.json())

app.use(cors());
app.get("/",(req,res)=>{
    res.send("Home page")
})

app.use("/user" , userRouter);
app.use("/add_document" , cartRoute)

app.listen(4500,async()=>{
    try{
        await connection
         console.log("Connected to DB")
    }catch(err){
        console.log(err.message)
    }
    console.log("Server is running at port 4500");
})