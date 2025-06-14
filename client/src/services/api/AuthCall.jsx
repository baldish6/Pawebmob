import { LiveUrl } from "./BackEndUrl";

export const CreateUser = async(data) =>{

      
    const response = await fetch(LiveUrl+'/auth/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      });

    return  response.json();
}

export const LoginUser = async(data) =>{

  const response = await fetch(LiveUrl+"/auth/login", {
      method: 'POST',
      body: JSON.stringify(data),
      'credentials': 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  return response.json();
}

export const LogOutUser = async()=>{
  const response = await fetch(LiveUrl+"/auth/logout",{
    method:'GET',
    'credentials': 'include',
    headers: {
      'Content-Type': 'application/json'
    },
 });

 return response;
}
