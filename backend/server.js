import express from "express"
import dotenv from "dotenv"
import { notFound,errorHandler } from "./middleware/errorMiddleware.js"
import connectDb from "./config/db.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import userRoute from "./routes/userRoute.js"
import productRoute from "./routes/productRoute.js"


dotenv.config()
const app = express()
connectDb()  

let port = process.env.PORT


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use("/api/user",userRoute)
app.use("/api/product",productRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>console.log("server created"))


