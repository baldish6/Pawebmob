import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { DeletePost } from "@/services/api/ImageCall";
import { useNavigate } from "react-router-dom";
import { DeletePostComments } from "@/services/api/ImageCall";
import { useParams } from "react-router-dom";
import { ImageAppWriteDelete } from "@/lib/AppWriteUtil";
import LikeImg from "./LikeImg";
import { useUserStore } from "@/store/UserSlice";
import {LiveUrl} from "@/services/api/BackEndUrl"
const ImageBody = ({ image, singleImage }) => {
    const DeletePostMutation = useMutation({ mutationFn: DeletePost });
    const DeletePostCommentsMutation = useMutation({
        mutationFn: DeletePostComments,
    });
    const navigate = useNavigate();
    const { id: imgId } = useParams();
    
    


    const deleteImg = () => {
        const response = ImageAppWriteDelete(image.imgUrl);
        response.then(() => {
            const responseData = DeletePostCommentsMutation.mutateAsync(imgId);

            responseData
                .then(() => {
                    const responseData2 = DeletePostMutation.mutateAsync(
                        image._id,
                    );
                    responseData2
                        .then(() => {
                            navigate("/home");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    //navigate("/home");
                })
                .catch((error) => {
                    console.log(error);
                });
        }),
            function (error) {
                console.log(error); // Failure
            };
    };

    return (
        <>
            <h1>{image.title}</h1>
            {singleImage && <Button onClick={deleteImg}>X</Button>}
            <img src={image.imgUrl}/>
            <h1>{image.desc}</h1>
        </>
    );
};

const ImageCard = ({ image, singleImage }) => {
  const {UserId} = useUserStore();

  //const urlPost = "http://localhost:5174/api/image/" + image._id
  const urlPost = LiveUrl+"/image/" + image._id;


    return (
        <div>
            {singleImage ? (
                <ImageBody singleImage={singleImage} image={image} />
            ) : (
                <a href={urlPost}>
                    <ImageBody singleImage={singleImage} image={image} />
                </a>
            )}
<LikeImg ImageId={image._id} likeValue={(image.likes).includes(UserId)}/>
        </div>
    );
};

export default ImageCard;