import client from '@/config/AppwriteConfig';
import React from 'react';
import { ID, Storage} from 'appwrite'

const ImageCard = ({image}) => {
   
  const two_url = (image.imgUrl.split("%26i=")) ;
  const bucket_id = two_url[0].slice(2);
  const file_id = two_url[1];

const storage = new Storage(client);
const result = storage.getFileView(bucket_id, file_id);

return(
    <div>
        <h1>{image.title}</h1>
        <img src={result}></img>
        <h1>{image.desc}</h1>
    </div>
)


}

export default ImageCard;