import React from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/UserSlice";
import { useMutation } from "@tanstack/react-query";
import { Unsubscribe, GetUserById } from "@/services/api/UserCall";
import { useQuery } from "@tanstack/react-query";
import { SubscribeUser } from "@/services/api/UserCall";
import { useParams } from "react-router-dom";

const SubButton = () => {
  const { UserId } = useUserStore();
  const { id } = useParams();

  const UnSubscribeMutation = useMutation({ mutationFn: Unsubscribe });
  const SubscribeMutation = useMutation({ mutationFn: SubscribeUser });

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: () => GetUserById(UserId),
    queryKey: ["GetUserById", { UserId }],
  });

  const Subscribe = () => {
    if (user.subscribedUsers.includes(id)) {
      UnSubscribeMutation.mutateAsync(id);
    } else {
      SubscribeMutation.mutateAsync(id);
    }
  };

  if (isLoading) {
    return <>Loading ...</>;
  }
  if (isError) {
    return <>{error}</>;
  }

  return (
    <>
      {id != UserId && (
        <Button onClick={Subscribe}>
          {user.subscribedUsers.includes(id) ? "Unsubscribe" : "Subscribe"}
        </Button>
      )}
    </>
  );
};

export default SubButton;