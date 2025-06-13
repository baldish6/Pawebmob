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

  return (
    <div>
      <h1>Posts</h1>
      {images?.map((image) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              //height: '100vh'
            }}
          >
            <ImageCard key={image._id} singleImage={false} image={image} />
          </div>
        );
      })}
    </div>
  );
};

export default Subscriptions;