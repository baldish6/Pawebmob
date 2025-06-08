import React, { useState } from 'react'
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
import { LoginSchema, RegisterSchema } from '@/lib/schema/LoginSchema'

const Login = () => {

  //const UserId = useUserStore(((state) => state.UserId));

    const navigate = useNavigate();
    const CreateUserMutation = useMutation({ mutationFn: CreateUser })
    const LoginUserMutation = useMutation({mutationFn:LoginUser})
    const {setUserId,setUserName} = useUserStore();

    const [isLogin,setIsLogin] = useState(true);

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
        resolver:zodResolver(RegisterSchema)
    }); 

    const {
      register:register2,
      handleSubmit: handleSubmit2,
      formState:{errors:errors2, isSubmitting:isSubmitting2},
      reset:reset2,
      setError:setError2,
  } = useForm({
      defaultValues:{
          email:'',
          password:'',
      },
      resolver:zodResolver(LoginSchema)
  }); 


    

    const onSubmit = async (data) => {
              const responseData = CreateUserMutation.mutateAsync(data);
              responseData.then(()=>{
                reset;
               handleLogin(data);
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
          //console.log(res)
          setUserId(res._id);
          setUserName(res.name)
          reset2;
          navigate("/home");
        })
        .catch((errors2)=>{
          if(errors2.email){
            setError2("email",{
                type:"server",
                message: errors2.email,
    })
    }else if(errors2.password){
            setError2("password",{
                type:"server",
                message: errors2.password,
            })
        }

        })
        ;
      };
   

  return (
    <div className='flex'>  
        <Card className="w-[350px] absolute m-auto left-0 right-0 top-1/5">
      <CardHeader>
        <CardTitle>{!isLogin?"Register":"Login"}</CardTitle>
      </CardHeader>
      <CardContent>

        { isLogin ? 

<form onSubmit={handleSubmit2(handleLogin)}>
<div className="grid w-full items-center gap-4">
  <div className="flex flex-col space-y-1.5">
    <Label htmlFor="name">Email</Label>
    <Input {...register2("email")}  type="email" placeholder="email..."/>
    {errors2.email && (
      <span className="error text-red-600">{errors2.email.message}</span>
    )}
  </div>

  <div className="flex flex-col space-y-1.5">
    <Label htmlFor="name">Password</Label>
    <Input {...register2("password")}  type="password" placeholder="password"/>
    {errors2.password && (
      <span className="error text-red-600">{errors2.password.message}</span>
    )}
  </div>
</div>

{
  isSubmitting2 ? 
  <Loader2>Loading....</Loader2>
   :

  <>

<div>
<Button type="submit" >Login</Button> 
</div>
<h1 className='underline' onClick={()=>setIsLogin(false)}>Go to Register</h1>
  
  </>
}

</form>

        :

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
          {
            isSubmitting ?
            <Loader2>Loading....</Loader2>
            :

            <>
            <div>
            <Button type="submit" >Register</Button> 
            </div>
            <h1 className='underline' onClick={()=>setIsLogin(true)}>Go to Login</h1>
            </>
           

          }
         
        </form>

            }

      </CardContent>
    </Card>
    </div>
  )
}

export default Login