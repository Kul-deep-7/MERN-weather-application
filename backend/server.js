import "./env.js"
import express from 'express'
import { Router } from 'express'
import { getAPIData } from './controller.js'
import cors from 'cors'

const app = express()
const router = Router()

// app.get("/", (req,res)=>{
//     res.send(`HELLO EXPRESS`)
// })


const corsOption = {
    origin: "http://localhost:5173"
}

app.use(cors(
    corsOption
))



app.use(express.json())

app.use(express.urlencoded({extended: true}))



//routes

router.route("/weather").get(getAPIData)

//app router / connect router
app.use("/api", router)


app.listen(5000,()=>{
    console.log("server started")
})
