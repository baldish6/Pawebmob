import ImageCard from "@/components/ImageCard";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GetPostById } from "@/services/api/ImageCall";
import { useUserStore } from "@/store/UserSlice";
import CommentInput from "@/components/CommentInput";
import "../styles/MiddlePost.css";


const Image = () => {
  const { id } = useParams();
  const { UserId } = useUserStore();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => GetPostById(id),
    queryKey: ["getUserInfo", { id }],
  });

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div>
        <h1>{JSON.stringify(error)}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="middle-post">
        <ImageCard key={data._id} singleImage={true} image={data}></ImageCard>
      </div>
      {UserId != "" && <CommentInput />}
    </>
  );
};

export default Image;