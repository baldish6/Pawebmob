import { useUserStore } from '@/store/UserSlice'
import React from 'react'
import { Link } from 'react-router-dom';
import AvatarProfile from './AvatarProfile';

const NavBar = () => {

  const {UserId,UserName} = useUserStore();

 
   return ( 
    <> 
    { UserId!= "" &&

<div className='bg-amber-600  flex gap-2'>
<Link to='/home'>Site Name</Link>
<ul className='flex gap-2 text-lg'>
    <li>
        <Link to="/settings">Settings</Link>
    </li>
    <li>
    <Link to="/image/new">New Post</Link>
    </li>
    <li>
    <Link to={"/profile/"+ UserId}>My Post</Link>
    </li>
</ul>
<h1>{UserName}</h1>
<AvatarProfile/>
</div>
    
    }
    
    </>)
  
}

export default NavBar