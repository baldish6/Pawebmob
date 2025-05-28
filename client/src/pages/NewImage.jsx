import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import React, { useState } from 'react'
import { ID, Storage} from 'appwrite'
import client from '@/config/AppwriteConfig'
import { useMutation, useQuery } from '@tanstack/react-query'
import { zodResolver }  from "@hookform/resolvers/zod";
import {  z } from "zod" 
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";


const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const PostSchema = z.object({
    title:z.string()
    .min(1,"Title is required")
    .max(300,"Max 300 characters"), 
    image: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ),
    desc:z.string().optional()
});

const NewImage = () => {

  const CreatePost = async(data) =>{
      
    const response = await fetch('http://localhost:4000/api/img/add', {
        method: 'POST',
        body: JSON.stringify(data),
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
    return  response.json();
  }
  



const navigate = useNavigate();
const CreatePostMutation = useMutation({ mutationFn: CreatePost })

const {
        register,
        handleSubmit,
        formState:{errors, isSubmitting},
        reset,
        setError,
    } = useForm({
        defaultValues:{
            title:'',
            image:undefined,
            desc:undefined
        },
        resolver:zodResolver(PostSchema)
    }); 
    

const storage = new Storage(client);

const onSubmit = (data) => {
  console.log(data);

  const promise = storage.createFile(
    '682f15180037da65c98f',
    ID.unique(),
    data.image[0]
  );
  
  promise.then(function (response) {

    console.log(response); // Success
    console.log(response.$id); 
    console.log(response.bucketId); 
    const imgUrl = response.bucketId+','+response.$id;
    var datapost = {};
    datapost.title = data.title;
    datapost.desc = data.desc;
    datapost.imgUrl = imgUrl;
    console.log("datapost");
    console.log(datapost);
    const responseData = CreatePostMutation.mutateAsync(datapost);
    console.log("responseData");
    console.log(responseData);
    responseData.then(()=>{
     reset;
     //navigate("/images"+'k');
    })
    .catch((error)=>{
      console.log(error); // Failure
    })

  }, function (error) {
    console.log(error); // Failure
  });
}


  return (
    <div> 
      <h1>Upload an Image</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Label>File</Label>
      <Input type="file"  {...register("image")}   placeholder="file..." accept="image/*"/>
      {errors.image && (
                <span className="error text-red-600">{errors.image.message}</span>
              )}
      <Label>Title</Label>
      <Input type="text"   {...register("title")} placeholder="Title"></Input>
      {errors.title && (
                <span className="error text-red-600">{errors.title.message}</span>
              )}
      <Label>Description</Label>
      <Input type="text"  {...register("desc")}  placeholder="Description" rows={8}></Input>
      {errors.desc && (
                <span className="error text-red-600">{errors.desc.message}</span>
              )}
      <Button type="submit">Upload</Button>
      </form>
    </div>
  )
}

export default NewImage