import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { Loader2 } from "lucide-react"
import { zodResolver }  from "@hookform/resolvers/zod";
import { useMutation } from '@tanstack/react-query'
import { useUserStore } from '@/store/UserSlice'
import { CreateUser, LoginUser} from '@/services/api/AuthCall'
import { LoginSchema } from '@/lib/schema/LoginSchema'

const Login = () => {

    const navigate = useNavigate();
    const CreateUserMutation = useMutation({ mutationFn: CreateUser })
    const LoginUserMutation = useMutation({mutationFn:LoginUser})
    const userLoginStore = useUserStore((state) => state.addUser)

    const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
        reset,
        setError,
    } = useForm({
        defaultValues:{
            name:'',
            email:'',
            password:'',
            confirmPassword:''
        },
        resolver:zodResolver(LoginSchema)
    }); 
    

    const onSubmit = async (data) => {
              const responseData = CreateUserMutation.mutateAsync(data);
              responseData.then(()=>{
                reset;
               handleLogin(data);
               navigate("/home");
              })
              .catch((errors)=>{
                if(errors.name){
                  setError("name",{
                      type:"server",
                      message: errors.name,
                  })
              }else if(errors.email){
                      setError("email",{
                          type:"server",
                          message: errors.email,
              })
              }else if(errors.password){
                      setError("password",{
                          type:"server",
                          message: errors.password,
                      })
                  }
              else if(errors.confirmPassword){
                      setError("confirmPassword",{
                          type:"server",
                          message: errors.confirmPassword,
                      })
                  }
              })
            }

    const handleLogin = async (data) => {
        const responseData = LoginUserMutation.mutateAsync(data);
        responseData
        .then((res)=>{
          userLoginStore(res);
        });
      };
   

  return (
    <div className='flex'>  
        <Card className="w-[350px] absolute m-auto left-0 right-0 top-1/5">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input {...register("name")} type="text" placeholder="Name"/>
              {errors.name && (
                <span className="error text-red-600">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input {...register("email")}  type="email" placeholder="email..."/>
              {errors.email && (
                <span className="error text-red-600">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Password</Label>
              <Input {...register("password")}  type="password" placeholder="password"/>
              {errors.password && (
                <span className="error text-red-600">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Confirm Password</Label>
              <Input {...register("confirmPassword")}  type="password" placeholder="password"/>
              {errors.confirmPassword && (
                <span className="error text-red-600">{errors.confirmPassword.message}</span>
              )}
            </div>

          </div>
          <div>
          <Button type="submit" >Register</Button> 
          </div>
        </form>
      </CardContent>
    </Card>
    </div>
  )
}

export default Login