
import { endpoint, project_id } from '../config/ParamConfig';

export const getImgUrl = (response) => {
    const imgUrl = endpoint+"/storage/buckets/"
                 +response.bucketId+
                 "/files/"+
                 response.$id+ 
                 "/view?project="+
                 project_id+"&mode=admin";
                 
                 return imgUrl;
    
  }
  