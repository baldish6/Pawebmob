import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";

const LikeImg = () => {

    const [liked,setLiked]= useState(false);

    const changeLike = () =>{
        console.log('hbjbj')
    }


  return (
    <>
    <FaRegHeart 
    className="w-10 h-10 hover:cursor-pointer hover:w-12 hover:h-12" 
    onClick={changeLike} />
    </>
  )
}

export default LikeImg