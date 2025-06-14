import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useMutation } from "@tanstack/react-query";
import { LikePost, DislikePost } from "@/services/api/UserCall";
const LikeImg = ({ ImageId, likeValue }) => {
  const [liked, setLiked] = useState(likeValue);
  const LikeMutation = useMutation({
    mutationFn: LikePost,
  });
  const DislikeMutation = useMutation({
    mutationFn: DislikePost,
  });

  const changeLike = () => {
    setLiked(!liked);

    if (liked) {
      const responseData = DislikeMutation.mutateAsync(ImageId);

      responseData
        .then(() => {})
        .catch((error) => {
          setLiked(!liked);
          console.log(error);
        });
    } else {
      const responseData = LikeMutation.mutateAsync(ImageId);

      responseData
        .then(() => {})
        .catch((error) => {
          setLiked(!liked);
          console.log(error);
        });
    }
  };

  return (
    <div className="z-10">
      {liked ? (
        <FaHeart
          className="w-10 h-10 hover:cursor-pointer hover:w-12 hover:h-12"
          onClick={changeLike}
        />
      ) : (
        <FaRegHeart
          className=" scale-200 hover:cursor-pointer hover:scale-225"
          onClick={changeLike}
        />
      )}
    </div>
  );
};

export default LikeImg