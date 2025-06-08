import client from '@/config/AppwriteConfig';
import React from 'react';
import { Storage} from 'appwrite'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';
import { DeletePost } from '@/services/api/ImageCall';
import { useNavigate } from "react-router-dom";
import { DeletePostComments } from '@/services/api/ImageCall';
import { useParams } from 'react-router-dom';
const ImageBody = ({image,result,singleImage}) =>{

  const DeletePostMutation = useMutation({mutationFn: DeletePost});
  const DeletePostCommentsMutation = useMutation({mutationFn: DeletePostComments});
  const navigate = useNavigate();
  const { id:imgId } = useParams();

  const deleteImg = () =>{

   


    const two_url = (image.imgUrl.split("%26i=")) ;
    const bucket_id = two_url[0].slice(2);
    const file_id = two_url[1];
    
      const storage = new Storage(client);
      const result =  storage.deleteFile(bucket_id, file_id );
      result.then(()=>{
        const responseData = DeletePostCommentsMutation.mutateAsync(imgId);
        
        responseData.then(()=>{
          const responseData2 = DeletePostMutation.mutateAsync(image._id);
          responseData2.then(()=>{
            navigate("/home");
          })
          .catch((error)=>{
            console.log(error);
          })
            //navigate("/home");
         })
         .catch((error)=>{
           console.log(error);
         })
      }
      , function (error) {
        console.log(error); 
      });
     

  }


  return(
     <>
     <h1>{image.title}</h1>
     {singleImage && <Button  onClick={deleteImg} >X</Button>}
      <img src={result}></img>
      <h1>{image.desc}</h1>
     </>
  )
}

const ImageCard = ({image,singleImage}) => {
   
  const two_url = (image.imgUrl.split("%26i=")) ;
  const bucket_id = two_url[0].slice(2);
  const file_id = two_url[1];

const storage = new Storage(client);
const result = storage.getFileView(bucket_id, file_id);



return(
    <div>
      {singleImage ?  <ImageBody singleImage={singleImage} image={image} result={result}/> :
      <a href={'http://localhost:5173/image/'+image._id}>
        <ImageBody singleImage={singleImage} image={image} result={result}/>
        </a>
        }
        
    </div>
)


}

export default ImageCard;