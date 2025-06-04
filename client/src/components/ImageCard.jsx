import client from '@/config/AppwriteConfig';
import React from 'react';
import { Storage} from 'appwrite'

const ImageCard = ({image}) => {
   
  const two_url = (image.imgUrl.split("%26i=")) ;
  const bucket_id = two_url[0].slice(2);
  const file_id = two_url[1];

const storage = new Storage(client);
const result = storage.getFileView(bucket_id, file_id);

return(
    <div>
        <a href={'http://localhost:5173/image/'+image._id}>
        <h1>ooo</h1>
        <img src={result}></img>
        <h1>{image.desc}</h1>
        </a>
    </div>
)


}

export default ImageCard;