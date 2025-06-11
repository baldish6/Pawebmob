export const GetUserById = async(id)=>{
   const response = await fetch('http://localhost:4000/api/user/find/'+id,{
      method:'GET'
   });
   return  response.json();
}

export const UpdateUser = async({data,UserId})=>{
   const response = await fetch('http://localhost:4000/api/user/'+UserId, {
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
   
   const response = await fetch('http://localhost:4000/api/user/'+UserId, {
      method:'DELETE',
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
   });
   return  response.json();
}
