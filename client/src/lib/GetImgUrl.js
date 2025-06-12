

export const getImgUrl = (response) => {
    const imgUrl = import.meta.env.VITE_ENDPOINT+"/storage/buckets/"
                 +response.bucketId+
                 "/files/"+
                 response.$id+ 
                 "/view?project="+
                 import.meta.env.VITE_PROJECT_ID+"&mode=admin";
                 
                 return imgUrl;
    
  }
  