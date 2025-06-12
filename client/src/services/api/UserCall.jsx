import { LiveUrl,LocalUrl } from "./BackEndUrl";


export const GetUserById = async(id)=>{
   const response = await fetch(LiveUrl+'/user/find/'+id,{
      method:'GET'
   });
   return  response.json();
}

export const SearchUser = async(searchParam)=>{

   if(searchParam==undefined){
      return {}
    }
    else{
   const response = await fetch(LiveUrl+'/user/search/'+searchParam,{
      method:'GET'
   });
   return  response.json();
}
}


export const UpdateUser = async({data,UserId})=>{
   const response = await fetch(LiveUrl+'/user/'+UserId, {
      method:'PUT',
      body: JSON.stringify(data),
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

//DeleteUser
export const DeleteUser = async(UserId)=>{
   
   const response = await fetch(LiveUrl+'/user/'+UserId, {
      method:'DELETE',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

export const LikePost = async(ImageId)=>{
   const response = await fetch(LiveUrl+'/user/like/'+ImageId, {
      method:'PUT',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

export const DislikePost = async(ImageId)=>{
   const response = await fetch(LiveUrl+'/user/dislike/'+ImageId, {
      method:'PUT',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

export const SubscribeUser = async(id)=>{
   console.log("call");
   console.log(id);
   const response = await fetch(LiveUrl+'/user/sub/'+id, {
      method:'PUT',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

export const Unsubscribe = async(id)=>{
   const response = await fetch(LiveUrl+'/user/unsub/'+id, {
      method:'PUT',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}

