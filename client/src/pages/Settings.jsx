import { Button } from "@/components/ui/button";
import React from "react";
import { useUserStore } from "@/store/UserSlice";
import { useMutation } from "@tanstack/react-query";
import { LogOutUser } from "@/services/api/AuthCall";
import { useNavigate } from "react-router-dom";
import UserInfo from "./UserInfo";

const Settings = () => {
    const navigate = useNavigate();
    const { logout } = useUserStore();
    const LogOutUserMutation = useMutation({ mutationFn: LogOutUser });
    const { setUserId, setUserName, setUserEmail, setUserAvatar } =
        useUserStore();

    const LogoutUser = () => {
        logout();
        const responseData = LogOutUserMutation.mutateAsync();
        responseData
            .then(() => {
                navigate("/login");
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
        <div>
            Settings
            <UserInfo setIsLogin={undefined} handleLogin={handleUpdate} />
            <Button onClick={LogoutUser}>Logout</Button>
        </div>
    );
};

export default Settings;