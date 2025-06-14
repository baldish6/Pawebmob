import React from "react";
import { useQuery } from "@tanstack/react-query";
import { GetSubscribedPosts } from "@/services/api/ImageCall";
import ImageCard from "@/components/ImageCard";

const Subscriptions = () => {
  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => GetSubscribedPosts(),
    queryKey: ["GetSubscribedPosts"],
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

  if(!isLoading&&images.length==0){
    return<h1>You haven't subscribed to any users</h1>
  }

  return (
    <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //height: '100vh'
            }}>
      <h1>Posts</h1>
      {images?.map((image) => {
        return (
           <ImageCard key={image._id} singleImage={false} image={image} />
        );
      })}
    </div>
  );
};

export default Subscriptions;