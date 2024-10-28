const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.send("Welcome to my node.js app")
})

app.listen(8080,()=>{
    console.log("Server is running")
})