import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
  import { useUserStore } from '@/store/UserSlice'

const AvatarProfile = () => {

      const {UserAvatar} = useUserStore();
    
  return (
    <>
<Avatar>
       {
        UserAvatar!="" ? <AvatarImage src={UserAvatar} alt="@shadcn" /> :
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
       } 
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </>
  )
}

export default AvatarProfile