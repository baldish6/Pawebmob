import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CreateUser } from "@/services/api/AuthCall";
import { useForm } from "react-hook-form";
import { RegisterSchema } from "@/lib/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getImgUrl } from "@/lib/GetImgUrl";
import { ImageAppWriteUpload, ImageAppWriteDelete } from "@/lib/AppWriteUtil";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useUserStore } from "@/store/UserSlice";
import { UpdateUser } from "@/services/api/UserCall";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserInfo = ({ setIsLogin, handleLogin }) => {
  const { UserName, UserAvatar, UserEmail, UserId } = useUserStore();
  const CreateUserMutation = useMutation({ mutationFn: CreateUser });
  const UpdateUserMutation = useMutation({ mutationFn: UpdateUser });
  const [editProfile, setEditProfile] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      name: UserName,
      email: UserEmail,
      password: "",
      confirmPassword: "",
      avatarUrl: UserAvatar,
      image: undefined,
    },
    resolver: zodResolver(RegisterSchema),
  });

  const watchImg = watch("image");

  const handleSuccess = (data) => {
    reset;
    handleLogin(data);
  };

  const handleServerError = (errors) => {
    if (errors.name) {
      setError("name", {
        type: "server",
        message: errors.name,
      });
    } else if (errors.email) {
      setError("email", {
        type: "server",
        message: errors.email,
      });
    } else if (errors.password) {
      setError("password", {
        type: "server",
        message: errors.password,
      });
    } else if (errors.confirmPassword) {
      setError("confirmPassword", {
        type: "server",
        message: errors.confirmPassword,
      });
    }
  };

  const onSubmit = async (data) => {
    if (UserId != "") {
      const response2 = ImageAppWriteDelete(UserAvatar);
      response2.then(() => {
        console.log("img deleted");
      }),
        function (error) {
          console.log(error); // Failure
        };
    }

    const response = ImageAppWriteUpload(data.image[0]);
    response.then((res) => {
      data["avatarUrl"] = getImgUrl(res);

      if (UserId == "") {
        const responseData = CreateUserMutation.mutateAsync(data);
        responseData
          .then(() => {
            handleSuccess(data);
          })
          .catch((errors) => {
            handleServerError(errors);
          }),
          function (error) {
            console.log(error); // Failure
          };
      } else {
        data["id"] = UserId;
        const responseData = UpdateUserMutation.mutateAsync({
          data,
          UserId,
        });
        responseData
          .then(() => {
            handleSuccess(data);
          })
          .catch((errors) => {
            handleServerError(errors);
          });
      }

      //console.log(data);
    }),
      function (error) {
        console.log(error); // Failure
      };
  };

  if (setIsLogin == undefined && editProfile == false) {
    return (
      //UserName, UserAvatar, UserEmail, UserId
      <>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>{UserName}</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center content-center gap-3">
            <Avatar className="w-16 h-16 ">
              <AvatarImage src={UserAvatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="content-center">{UserEmail}</h1>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              onClick={() => {
                setEditProfile(true);
              }}
            >
              Edit
            </Button>
          </CardFooter>
        </Card>
      </>
    );
  }

  return (
    <div>
      {setIsLogin == undefined && (
        <Button
          onClick={() => {
            reset();
            setEditProfile(false);
          }}
        >
          Undo Edit
        </Button>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full items-center gap-4 pt-4">
          <div className="flex flex-col space-y-1.5">
            <Label>Avatar</Label>
            <Input
              type="file"
              {...register("image")}
              placeholder="file..."
              accept="image/*"
            />
            {errors.image && (
              <span className="error text-red-600">{errors.image.message}</span>
            )}
            {(watchImg != undefined && watchImg.length > 0 && (
              <div className="flex">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={URL.createObjectURL(watchImg[0])}
                    alt="alt"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  onClick={() => {
                    setValue("image", undefined);
                  }}
                >
                  x
                </Button>
              </div>
            )) ||
              (watchImg == undefined && (
                <Avatar className="w-16 h-16">
                  {UserAvatar == "" ? (
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  ) : (
                    <AvatarImage src={UserAvatar} alt="@shadcn" />
                  )}

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ))}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input {...register("name")} type="text" placeholder="Name" />
            {errors.name && (
              <span className="error text-red-600">{errors.name.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input {...register("email")} type="email" placeholder="email..." />
            {errors.email && (
              <span className="error text-red-600">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="password"
            />
            {errors.password && (
              <span className="error text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Confirm Password</Label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="password"
            />
            {errors.confirmPassword && (
              <span className="error text-red-600">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        {isSubmitting ? (
          <Loader2>Loading....</Loader2>
        ) : (
          <>
            <div className="pt-4">
              <Button type="submit">
                {UserId == "" ? "Register" : "Update"}
              </Button>
            </div>
            {setIsLogin != undefined && (
              <h1
                className="underline"
                onClick={() => {
                  reset();
                  setIsLogin(true);
                }}
              >
                Go to Login
              </h1>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default UserInfo;