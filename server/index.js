import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js"
/*import commentRoutes from "./routes/comments.js"
*/
import authRoutes from "./routes/auth.js"
import imageRoutes from "./routes/images.js"
import { verifyToken } from "./middleware/verifyToken.js";
import Image from "./models/Image.js";
import { addImage } from "./controllers/image.js";



dotenv.config();
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({extended:true},))
app.use(cookieParser());

/*
app.use("/api/users", userRoutes)
app.use("/api/images", imageRoutes)
app.use("/api/comments", commentRoutes)
*/
app.use('/api/auth', authRoutes);
app.use('/api/img', imageRoutes);
app.use('/api/users', userRoutes);



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
