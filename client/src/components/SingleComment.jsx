import React, { useState } from 'react'
import { useUserStore } from "@/store/UserSlice";
import { Button } from './ui/button';
import { GetUserById } from '@/services/api/UserCall';
import { useQuery , useMutation,useQueryClient} from '@tanstack/react-query';
import { DeleteComment,UpdateComment} from "@/services/api/CommentCall";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CommentSchema } from '@/lib/schema/CommentSchema';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

const SingleComment = ({comment}) => {
      const { UserId } = useUserStore();

      const userSearch = comment.userId;
      const queryClient= useQueryClient();
      const [editing, setEditing] = useState(false);

      const {
          register,
          handleSubmit,
          formState: { errors, isSubmitting },
          setError,
          reset
        } = useForm({
          defaultValues: {
            desc: comment.desc,
          },
          resolver: zodResolver(CommentSchema),
        });
      


      const {data:user,isLoading,} = useQuery({
        queryFn:()=> GetUserById(userSearch),
        queryKey:["user",{userSearch}],
      })

      const DeleteCommentMutation = useMutation({
        mutationFn: DeleteComment,
        onSuccess: ()=>{
           queryClient.invalidateQueries(["comments"])
        }
        });

        const UpdateCommentMutation = useMutation({
             mutationFn: UpdateComment,
             onSuccess: ()=>{
                queryClient.invalidateQueries(["comments"])
             }
             });

        const changeComment = async (data) => {

          setEditing(false);
          const cid =  comment._id;
          const responseData = UpdateCommentMutation.mutateAsync({data,cid});
          responseData
            .then(() => {
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



      if(isLoading){
        return <div>Loading comment ... </div>
      }
    
  return (
    <div className='flex gap-2'>
        <h1>{user.name}</h1>
        {!editing&& <h1>{comment.desc}</h1>}
        {comment.userId==UserId && 
        <>
        <Button onClick={()=>{DeleteCommentMutation.mutateAsync(comment._id)}}>X</Button>

        {!editing?(
          <Button onClick={()=>{setEditing(true)}}>Y</Button>
          ):(
            <>
             <form onSubmit={handleSubmit(changeComment)}>
              <Input  {...register("desc")} placeholder={comment.desc}></Input>
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

             <Button onClick={()=>{
              setEditing(false);
              reset();
              queryClient.invalidateQueries(["comments"]);
              }}  >undo</Button>



            </>
           )
          }

        </>
        }
    </div>
  )
}

export default SingleComment