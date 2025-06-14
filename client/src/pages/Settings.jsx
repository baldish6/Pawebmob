import { Button } from "@/components/ui/button";
import React from "react";
import { useUserStore } from "@/store/UserSlice";
import { useMutation } from "@tanstack/react-query";
import { LogOutUser } from "@/services/api/AuthCall";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import DelUs from "@/components/DelUs";
import { DeleteUser } from "@/services/api/UserCall";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useUserStore();
  const LogOutUserMutation = useMutation({ mutationFn: LogOutUser });
  const {
    UserId,
    UserAvatar,
    setUserId,
    setUserName,
    setUserEmail,
    setUserAvatar,
  } = useUserStore();

  const LogoutUser = () => {
    const responseData = LogOutUserMutation.mutateAsync();
    responseData
      .then(() => {
        navigate("/login");
        logout();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = (res) => {
    setUserId(res._id);
    setUserName(res.name);
    setUserAvatar(res.avatarUrl);
    setUserEmail(res.email);
    navigate("/home");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        paddingTop: "10lvh",
        //height: '100vh'
      }}
    >
      Settings:
      <UserInfo
        className="pt-4"
        setIsLogin={undefined}
        handleLogin={handleUpdate}
      />
      <div className="flex gap-3 pt-3 justify-center">
        <DelUs />
        <Button onClick={LogoutUser}>Logout</Button>
      </div>
    </div>
  );
};

export default Settings;