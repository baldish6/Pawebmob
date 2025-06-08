import client from '@/config/AppwriteConfig';
import React from 'react';
import { Storage} from 'appwrite'
import { Button } from './ui/button';
import { useMutation } from '@tanstack/react-query';

const ImageBody = ({image,result}) =>{

  const DeletePostMutation = useMutation({mutationFn: DeletePost});


  return(
     <>
     <h1>{image.title}</h1>
     <Button>X</Button>
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
      {singleImage ?  <ImageBody image={image} result={result}/> :
      <a href={'http://localhost:5173/image/'+image._id}>
        <ImageBody image={image} result={result}/>
        </a>
        }
        
    </div>
)


}

export default ImageCard;