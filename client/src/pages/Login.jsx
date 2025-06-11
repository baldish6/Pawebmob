import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "@/store/UserSlice";
import { LoginUser } from "@/services/api/AuthCall";
import { LoginSchema, RegisterSchema } from "@/lib/schema/LoginSchema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import UserInfo from "../components/UserInfo";

const Login = () => {
    //const UserId = useUserStore(((state) => state.UserId));

    const navigate = useNavigate();
    const LoginUserMutation = useMutation({ mutationFn: LoginUser });
    const { setUserId, setUserName, setUserEmail, setUserAvatar } = useUserStore();

    const [isLogin, setIsLogin] = useState(true);

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2, isSubmitting: isSubmitting2 },
        reset: reset2,
        setError: setError2,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema),
    });

    const handleLogin = async (data) => {
        const responseData = LoginUserMutation.mutateAsync(data);
        responseData
            .then((res) => {
                //console.log(res)
                setUserId(res._id);
                setUserName(res.name);
                setUserAvatar(res.avatarUrl);
                setUserEmail(res.email);
                reset2;
                navigate("/home");
            })
            .catch((errors2) => {
                if (errors2.email) {
                    setError2("email", {
                        type: "server",
                        message: errors2.email,
                    });
                } else if (errors2.password) {
                    setError2("password", {
                        type: "server",
                        message: errors2.password,
                    });
                }
            });
    };

    return (
        <div className="flex">
            <Card className="w-[350px] absolute m-auto left-0 right-0 top-1/5">
                <CardHeader>
                    <CardTitle>{!isLogin ? "Register" : "Login"}</CardTitle>
                </CardHeader>
                <CardContent>

                  {
                    !isLogin ? <UserInfo setIsLogin={setIsLogin} handleLogin={handleLogin}/>
                    :

                    <form onSubmit={handleSubmit2(handleLogin)}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input
                                    {...register2("email")}
                                    type="email"
                                    placeholder="email..."
                                />
                                {errors2.email && (
                                    <span className="error text-red-600">
                                        {errors2.email.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Password</Label>
                            <Input
                                {...register2("password")}
                                type="password"
                                placeholder="password"
                            />
                            {errors2.password && (
                                <span className="error text-red-600">
                                    {errors2.password.message}
                                </span>
                            )}
                        </div>

                        {isSubmitting2 ? (
                            <Loader2>Loading....</Loader2>
                        ) : (
                            <>
                                <div>
                                    <Button type="submit">Login</Button>
                                </div>
                                <h1
                                    className="underline"
                                    onClick={() => setIsLogin(false)}
                                >
                                    Go to Register
                                </h1>
                            </>
                        )}
                    </form>
                  }
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;