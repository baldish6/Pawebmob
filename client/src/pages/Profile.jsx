import { GetUserPosts } from "@/services/api/ImageCall";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import ImageCard from "@/components/ImageCard";
import SubButton from "@/components/SubButton";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/UserSlice";
import {  GetUserById } from "@/services/api/UserCall";
import "../styles/MiddlePost.css";

const Profile = () => {
  const { id } = useParams();
    const navigate = useNavigate();
    const {  UserId } =
        useUserStore();

  const {
      data: user,
      isLoading:isLoadin2,
      isError:isError2,
      error:error2,
    } = useQuery({
      queryFn: () => GetUserById(id),
      queryKey: ["GetUserById", { id }],
    });  
    
    const {
      data: user3,
      isLoading:isLoadin23,
      isError:isError23,
      error:error23,
    } = useQuery({
      queryFn: () => GetUserById(UserId),
      queryKey: ["GetUserById", { UserId }],
    });


  const {
    data: images,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => GetUserPosts(id),
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
        <h1>Posts</h1>
        {!isError23&&!isLoadin23&&
        <SubButton uid={id} subValue={user3.subscribedUsers.includes(id)} />}
        {
           (!isLoading&&images!=undefined&&images.length==0&&id==UserId)?
           <>
           <h1>You haven't made any new Post</h1>
           <Button onClick={()=>{navigate("/image/new")}}>Make Post</Button>
           </>
                    
                    :

                    (!isLoading&&images!=undefined&&images.length==0&&id!=UserId)?
           <>
           <h1>This User has no   Post</h1>
           </>:

        images?.map((image) => {
          return (
            <ImageCard key={image._id} singleImage={false} image={image} />
          );
        })}
      </div>
    </>
  );
};

export default Profile;