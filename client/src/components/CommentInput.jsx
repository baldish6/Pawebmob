import React from 'react'
import {  Input } from './ui/input';
import { useUserStore } from '@/store/UserSlice'

const CommentInput = () => {

      const {UserId,UserName} = useUserStore();
    
  return (
    <div>
        <h1>{UserName}</h1>
        <Input placeholder='comment...' ></Input>
    </div>
  )
}

export default CommentInput;