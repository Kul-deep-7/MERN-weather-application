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



app.use(cors({
    origin: "http://localhost:3000"
}))

app.use(express.json())

app.use(express.urlencoded({extended: true}))



//routes

router.route("/weather").post(getAPIData)

//app router / connect router
app.use("/api", router)


app.listen(5000,()=>{
    console.log("server started")
})
