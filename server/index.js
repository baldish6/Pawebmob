import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

/*
import userRoutes from "./routes/users.js"
import imageRoutes from "./routes/images.js"
import commentRoutes from "./routes/comments.js"
*/
import authRoutes from "./routes/auth.js"

import cookieParser from "cookie-parser";



dotenv.config();
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());

/*
app.use("/api/users", userRoutes)
app.use("/api/images", imageRoutes)
app.use("/api/comments", commentRoutes)
*/
app.use('/api/auth', authRoutes)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })


const connect = () =>{
    mongoose
    .connect(process.env.MONGO)
    .then(()=>{console.log("Connected to DB")})
    .catch((err)=>{
        throw err;
    })
}

app.listen(process.env.PORT,()=>{
    connect();
    console.log('Connected to server')
})
