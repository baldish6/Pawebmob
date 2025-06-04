import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import { ID, Storage} from 'appwrite'
import client from '@/config/AppwriteConfig'
import { useMutation } from '@tanstack/react-query'
import { zodResolver }  from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom";
import { CreatePost } from '@/services/api/ImageCall'
import { PostSchema } from '@/lib/schema/PostSchema'

const NewImage = () => {

///const navigate = useNavigate();
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
    


const onSubmit = (data) => {
  console.log(data);

  
const storage = new Storage(client);

  const promise = storage.createFile(
    '682f15180037da65c98f',
    ID.unique(),
    data.image[0]
  );
  
  promise.then(function (response) {

    
    const imgUrl = "b="+ response.bucketId+'%26i='+response.$id;
    var datapost = {};
    datapost.title = data.title;
    datapost.desc = data.desc;
    datapost.imgUrl = imgUrl;
   
    const responseData = CreatePostMutation.mutateAsync(datapost);
   
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