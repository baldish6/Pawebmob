import {  z } from "zod" 

export const CommentSchema = z.object({
    desc:z.string()
    .min(1,"Comment is required")
    .max(10000,"Max 10000 characters"), 
   
});