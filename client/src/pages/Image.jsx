import ImageCard from '@/components/ImageCard'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { GetPostById } from '@/services/api/ImageCall'
import { useUserStore } from '@/store/UserSlice'
import CommentInput from '@/components/CommentInput'

const Image = () => {

  const { id } = useParams();
  const { currentUser } = useUserStore()

    const {data,isLoading,isError,error}= useQuery({
        queryFn:()=>GetPostById(id),
        queryKey:["getUserInfo",{id}],
    })

    if (isLoading){
        return (<div><h1>Loading...</h1></div>)
    }
    if(isError){
        return(<div><h1>{JSON.stringify(error)}</h1></div>)
    }

    console.log(data)

  return (
    <div>
      <ImageCard image={data}></ImageCard>
      {currentUser==null && <CommentInput/> }
    </div>
  )
}

export default Image