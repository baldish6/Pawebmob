import { GetUserPosts } from '@/services/api/ImageCall'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import ImageCard from '@/components/ImageCard'

const Profile = () => {

    const { id } = useParams();

    const {data:images,isLoading,isError,error}= useQuery({
        queryFn:()=>GetUserPosts(id),
        queryKey:["getUserInfo",{id}],
    })

    if (isLoading){
        return (<div><h1>Loading...</h1></div>)
    }
    if(isError){
        return(<div><h1>{JSON.stringify(error)}</h1></div>)
    }

  return (
    <div>
        <h1>Posts</h1>
        {images?.map((image)=>{
           return (<ImageCard key={image._id} singleImage={false} image={image} />)
        })}
    </div>
  )
}

export default Profile