import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import imageRoutes from "./routes/images.js"
import commentRoutes from "./routes/comments.js"
import authRoutes from "./routes/auth.js"



dotenv.config();
const app=express()

app.use("/api/users", userRoutes)
app.use("/api/images", imageRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/auth", authRoutes)


const connect = () =>{
    mongoose
    .connect(process.env.MONGO)
    .then(()=>{console.log("Connected to DB")})
    .catch((err)=>{
        throw err;
    })
}

app.listen(8800,()=>{
    connect();
    console.log('Connected to server')
})
