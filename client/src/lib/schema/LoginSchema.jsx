import {  z } from "zod" 

const NameSchema = z.object({
    name:z.string().min(1,"Name is required")
});

const EmailSchema = z.object({
    email: z.string().email()
})

const PasswordSchema = z.object({
    password:z.string().min(8, "Password must be at least 8 characters")
})

const ConfirmPasswordSchema = z.object({
    confirmPassword:z.string().min(8, "Confirmed password must be at least 8 characters")
})

export const LoginSchema = EmailSchema.merge(PasswordSchema);

export const RegisterSchema = ((LoginSchema.merge(NameSchema)).merge(ConfirmPasswordSchema))
.refine(data => data.password==data.confirmPassword,{
    message: "Password must match",
    path:["confirmPassword"],
});


