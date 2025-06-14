import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserSlice";
import { useMutation } from "@tanstack/react-query";
import { Unsubscribe, GetUserById } from "@/services/api/UserCall";
import { useQuery } from "@tanstack/react-query";
import { SubscribeUser } from "@/services/api/UserCall";
import { useParams } from "react-router-dom";

const SubButton = ({subValue,uid}) => {

  const [subbed,setSubbed]= useState(subValue);

  const UnSubscribeMutation = useMutation({ mutationFn: Unsubscribe });
  const SubscribeMutation = useMutation({ mutationFn: SubscribeUser });


  const Subscribe = () => {
    setSubbed(!subbed)
    if (subbed) {
      UnSubscribeMutation.mutateAsync(uid);
     if( !UnSubscribeMutation.isSuccess){
      setSubbed(!subbed);
     }
    } else {
      SubscribeMutation.mutateAsync(uid);
      if( !SubscribeMutation.isSuccess){
      setSubbed(!subbed);
     }
    }
  };
  return (
    
        <Button onClick={Subscribe}>
          {subbed ? "Unsubscribe" : "Subscribe"}
        </Button>
   
  );
};

export default SubButton;