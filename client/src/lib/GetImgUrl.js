

export const getImgUrl = (response) => {
    const imgUrl = process.env.REACT_APP_ENDPOINT+"/storage/buckets/"
                 +response.bucketId+
                 "/files/"+
                 response.$id+ 
                 "/view?project="+
                 process.env.REACT_APP_PROJECT_ID+"&mode=admin";
                 
                 return imgUrl;
    
  }
  