import { LiveUrl } from "./BackEndUrl";


export const CreatePost = async(data) =>{
      
    const response = await fetch(LiveUrl+'/img/add', {
        method: 'POST',
        body: JSON.stringify(data),
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
    return  response.json();
}

export const GetUserPosts = async(user_id)=>{
     const response = await fetch(LiveUrl+'/img/profile/'+user_id,{
        method:'GET',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
     });
     return  response.json();
}

export const GetSubscribedPosts = async()=>{
  const response = await fetch(LiveUrl+'/img/getSub/',{
     method:'GET',
     'credentials': 'include',
     headers: {
       'Content-Type': 'application/json'
     },
  });
  return  response.json();
}

export const GetPostById = async(id)=>{
    const response = await fetch(LiveUrl+'/img/'+id,{
       method:'GET'
    });
    return  response.json();
}

export const GetRandom = async()=>{
  const response = await fetch(LiveUrl+'/img/random',{
     method:'GET'
  });
  return  response.json();
}

export const SearchPost = async(searchParam)=>{
  if(searchParam==undefined){
    return {}
  }
  else{
  
  const response = await fetch(LiveUrl+'/img/search/'+searchParam,{
     method:'GET'
  });
  return  response.json();
}
}

export const DeletePost = async(id)=>{
  const response = await fetch(LiveUrl+'/api/img/'+id,{
     method:'DELETE',
     'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
  });
  return  response.json();
}

export const DeletePostComments = async(id)=>{
  const response = await fetch(LiveUrl+'/comment/imgdl/'+id,{
     method:'DELETE',
     'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
  });
  return  response.json();
}


