import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { GetRandom } from '@/services/api/ImageCall'
import ImageCard from '@/components/ImageCard'

const Home = () => {

  const {data:images,isLoading,isError,error}= useQuery({
    queryFn:()=>GetRandom(),
    queryKey:["GetRandom"],
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

export default Home