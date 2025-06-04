import { Button } from '@/components/ui/button'
import React from 'react'
import { useUserStore } from '@/store/UserSlice'
import { useMutation } from '@tanstack/react-query'
import { LogOutUser } from '@/services/api/AuthCall'
import { useNavigate } from 'react-router-dom'

const Settings = () => {

    const {logout} = useUserStore();
    const LogOutUserMutation = useMutation({mutationFn:LogOutUser});
    const navigate = useNavigate();



  return (
    <div>
       Settings
       <Button onClick={()=>{
        logout()
        const responseData = LogOutUserMutation.mutateAsync();
        responseData
        .then(()=>{
            navigate("/login");
        })
        .catch((error)=>{
            console.log(error)
        });
       }}>Logout</Button>
    </div>
  )
}

export default Settings