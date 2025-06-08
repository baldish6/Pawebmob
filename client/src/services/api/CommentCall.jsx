export const CreateComment = async(data) =>{

    const response = await fetch('http://localhost:4000/api/comment/', {
        method: 'POST',
        body: JSON.stringify(data),
        'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
    return  response.json();
}


export const GetPostComments = async(id)=>{
    const response = await fetch('http://localhost:4000/api/comment/'+id,{
       method:'GET'
    });
    return  response.json();
}

export const UpdateComment = async({data,cid}) =>{

  const response = await fetch('http://localhost:4000/api/comment/'+cid, {
      method: 'PUT',
      body: JSON.stringify(data),
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    });

  return  response.json();
}



export const DeleteComment = async(id)=>{
  const response = await fetch('http://localhost:4000/api/comment/'+id,{
     method:'DELETE',
     'credentials': 'include',
        headers: {
          'Content-Type': 'application/json'
        },
  });
  return  response.json();
}