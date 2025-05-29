export const CreatePost = async(data) =>{
      
    const response = await fetch('http://localhost:4000/api/img/add', {
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
     const response = await fetch('http://localhost:4000/api/img/profile/'+user_id,{
        method:'GET',
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
     });
     return  response.json();
}