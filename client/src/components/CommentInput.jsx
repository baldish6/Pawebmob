import React from "react";
import { Input } from "./ui/input";
import { useUserStore } from "@/store/UserSlice";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateComment } from "@/services/api/CommentCall";
import { CommentSchema } from "@/lib/schema/CommentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import SingleComment from "./SingleComment";
import { GetPostComments } from "@/services/api/CommentCall";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const CommentInput = () => {
  const { UserName } = useUserStore();
  const { id } = useParams();
  
  const queryClient = useQueryClient();

  const CreateCommentMutation = useMutation({
    mutationFn: CreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    },
  });
  
  const { data: comments, isLoading } = useQuery({
    queryFn: () => GetPostComments(id),
    queryKey: ["comments", { id }],
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      desc: "",
    },
    resolver: zodResolver(CommentSchema),
  });

  const handleComment = async (data) => {
    var datapost = {};
    datapost.desc = data.desc;
    datapost.imageId = id;

    const responseData = CreateCommentMutation.mutateAsync(datapost);
    responseData
      .then(() => {
        reset();
      })
      .catch((errors) => {
        if (errors.desc) {
          setError("desc", {
            type: "server",
            message: errors.email,
          });
        }
      });
  };

  if (isLoading) {
    return <div>Loading comments ... </div>;
  }

  return (
    <div className="flex flex-col gap-4  pl-4 pr-4 pb-4">
      <h1>{UserName}</h1>
      <form className="flex flex-col gap-2 " onSubmit={handleSubmit(handleComment)}>
        <div>
           <Input {...register("desc")} placeholder="comment..."></Input>
        </div>
        {isSubmitting ? (
          <Loader2>Loading....</Loader2>
        ) : (
          <>
            <div>
              <Button type="submit">Comment</Button>
            </div>
          </>
        )}
      </form>
      <div>
        {comments?.map((comment) => {
          return <SingleComment key={comment._id} comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default CommentInput;