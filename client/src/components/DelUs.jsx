import React from 'react'
import { GetUserPosts } from '@/services/api/ImageCall'
import { useUserStore } from "@/store/UserSlice";
import { Button } from "@/components/ui/button";
import { ImageAppWriteDelete } from "@/lib/AppWriteUtil";
import { useMutation } from '@tanstack/react-query';
import { DeleteUser } from '@/services/api/UserCall';
import { useNavigate } from 'react-router-dom';


const DelUs = () => {

    const {
        UserId,
        logout,
        UserAvatar
    } = useUserStore();

    const navigate = useNavigate();


        const DeleteUserMutation = useMutation({ mutationFn: DeleteUser });
    
    

    const  DeleteStorageImages = () =>{
      
        logout();
        navigate("/login");
        
        const response2 = ImageAppWriteDelete(UserAvatar);
        response2.then(() => {

        const res =  GetUserPosts(UserId);
        res.then((resp)=>{
            for (let i = 0; i < resp.length; i++) {
                const response3 = ImageAppWriteDelete(resp[i].imgUrl);
                        response3.then(() => { }),
                        function (error3) {
                            console.log(error3); // Failure
                        };
              } 
        })

        const responseData7 = DeleteUserMutation.mutateAsync(UserId);
        responseData7
                .then(() => {})
                .catch((error7) => {
                    console.log(error7);
                });


    }),
    function (error) {
        console.log(error); // Failure
    };

    }

    
  return (
    <div>
        <Button onClick={DeleteStorageImages}>Delete User</Button>
    </div>
  )
}

export default DelUs