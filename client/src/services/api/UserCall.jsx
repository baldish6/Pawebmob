

/*export const GetUserPosts = async(user_id)=>{
    const response = await fetch('http://localhost:4000/api/find/'+user_id,{
       method:'GET',
       'credentials': 'include',
       headers: {
         'Content-Type': 'application/json'
       },
    });
    return  response.json();
}
*/
export const GetUserById = async(id)=>{
   const response = await fetch('http://localhost:4000/api/user/find/'+id,{
      method:'GET'
   });
   return  response.json();
}

