import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";
import { z, ZodError } from "zod" 
import Cookies from 'js-cookie'


const LoginSchema = z.object({
    name:z.string(),
    email: z.string().email(),
    password:z.string().min(8, "Password must be at least 8 characters"), 
    confirmPassword:z.string().min(8, "Confirmed password must be at least 8 characters"),
    avatarUrl:z.string().optional(),
}).refine(data => data.password==data.confirmPassword,{
    message: "Password must match",
    path:["confirmPassword"],
});

export const register = async (req, res, next) => {

    const salt = bcrypt.genSaltSync(10);

    const result = LoginSchema.safeParse(req.body);
    let zodErrors = {};
    if(!result.success){
        result.error.issues.forEach((issue)=>{
            zodErrors = {...zodErrors,[issue.path[0]]:issue.message};
        })}
     
    if(Object.keys(zodErrors).length>0){
        res.status(400).json({errors:zodErrors});
    } 
    else{
        try{

            const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });
    
        await newUser.save();
        res.status(200).json("User has been created!");
    } catch (err) {
        next(err);
      }
    }   
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

    const token = jwt.sign({ id: user._id }, process.env.JWT,{expiresIn:"1h"});
    const { password, ...others } = user._doc;

    delete req.body.password;

    
   

    res.cookie("access_token", token, {
        httpOnly: true,
        secure:true,
        samesite:'None',
        path:"/",
        partitioned:true
      })
    .status(200)
      .json(others)
    
      
  } catch (err) {
    throw err;
  }
};

export const logout = async(req,res)=>{

res
.cookie("access_token", "", {
        httpOnly: true,
        maxAge:1,
        samesite:'None',
        path:"/",
        partitioned:true
      })
      .status(200)
      .json({ success: true });
}