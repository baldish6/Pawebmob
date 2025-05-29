import {  z } from "zod" 

export const LoginSchema = z.object({
    name:z.string().min(1,"Name is required"),
    email: z.string().email(),
    password:z.string().min(8, "Password must be at least 8 characters"), 
    confirmPassword:z.string().min(8, "Confirmed password must be at least 8 characters")
}).refine(data => data.password==data.confirmPassword,{
    message: "Password must match",
    path:["confirmPassword"],
});
