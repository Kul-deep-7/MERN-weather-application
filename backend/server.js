import express from 'express'

const app = express()

app.get("/", (req,res)=>{
    `HELLO EXPRESS`
})

app.listen(5000,()=>{
    console.log("server started")
})