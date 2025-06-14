import React from "react";
import { useMutation } from "@tanstack/react-query";
import { DeletePost } from "@/services/api/ImageCall";
import { useNavigate } from "react-router-dom";
import { DeletePostComments } from "@/services/api/ImageCall";
import { useParams } from "react-router-dom";
import { ImageAppWriteDelete } from "@/lib/AppWriteUtil";
import LikeImg from "./LikeImg";
import { useUserStore } from "@/store/UserSlice";
import { Link } from "react-router-dom";
import { SlClose } from "react-icons/sl";
import { GetUserById } from "@/services/api/UserCall";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ImageBody = ({ image, singleImage }) => {
  
  const navigate = useNavigate();
  const { id: imgId } = useParams();
  const { UserId } = useUserStore();
    const userSearch = image.userId;


  const DeletePostMutation = useMutation({ mutationFn: DeletePost });
  const DeletePostCommentsMutation = useMutation({
    mutationFn: DeletePostComments,
  });

  const { data: user, isLoading } = useQuery({
    queryFn: () => GetUserById(userSearch),
    queryKey: ["user", { userSearch }],
  });

  const deleteImg = () => {
    const response = ImageAppWriteDelete(image.imgUrl);
    response.then(() => {
      const responseData = DeletePostCommentsMutation.mutateAsync(imgId);

      responseData
        .then(() => {
          const responseData2 = DeletePostMutation.mutateAsync(image._id);
          responseData2
            .then(() => {
              navigate("/home");
            })
            .catch((error) => {
              console.log(error);
            });
         
        })
        .catch((error) => {
          console.log(error);
        });
    }),
      function (error) {
        console.log(error); 
      };
  };

  return (
    <>
      <Card className="max-w-xl">
        <CardHeader>

          {user && 
          <div className="flex gap-2">
            <Avatar>
        <AvatarImage src={user.avatarUrl} alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <h1>{user.name}</h1>
          </div>
          
          }


          <CardTitle>{image.title}</CardTitle>

          <CardAction>
            {singleImage && image.userId == UserId && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <SlClose className="scale-200 hover:cursor-pointer hover:scale-225 " />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                    <AlertDialogDescription>
                      permanently delete your post ?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteImg}>
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardAction>
        </CardHeader>
        <CardContent className="flex justify-center p-4">
          <img src={image.imgUrl} />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-4">
            <h1>{image.desc}</h1>
            <LikeImg
              ImageId={image._id}
              likeValue={image.likes.includes(UserId)}
            />
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

const ImageCard = ({ image, singleImage }) => {
  return (
    <div className="mb-4">
      {singleImage ? (
        <ImageBody singleImage={singleImage} image={image} />
      ) : (
        <Link to={"/image/" + image._id}>
          <ImageBody singleImage={singleImage} image={image} />
        </Link>
      )}
    </div>
  );
};

export default ImageCard;