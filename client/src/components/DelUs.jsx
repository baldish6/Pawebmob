import React from "react";
import { GetUserPosts } from "@/services/api/ImageCall";
import { useUserStore } from "@/store/UserSlice";
import { Button } from "@/components/ui/button";
import { ImageAppWriteDelete } from "@/lib/AppWriteUtil";
import { useMutation } from "@tanstack/react-query";
import { DeleteUser } from "@/services/api/UserCall";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DelUs = () => {
  const { UserId, logout, UserAvatar } = useUserStore();

  const navigate = useNavigate();

  const DeleteUserMutation = useMutation({ mutationFn: DeleteUser });

  const DeleteStorageImages = () => {
    logout();
    navigate("/login");

    const response2 = ImageAppWriteDelete(UserAvatar);
    response2.then(() => {
      const res = GetUserPosts(UserId);
      res.then((resp) => {
        for (let i = 0; i < resp.length; i++) {
          const response3 = ImageAppWriteDelete(resp[i].imgUrl);
          response3.then(() => {}),
            function (error3) {
              console.log(error3); // Failure
            };
        }
      });

      const responseData7 = DeleteUserMutation.mutateAsync(UserId);
      responseData7
        .then(() => {})
        .catch((error7) => {
          console.log(error7);
        });
    }),
      function (error) {
        console.log(error); // Failure
      };
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button>Delete User</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={DeleteStorageImages}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DelUs;