import { useUserStore } from '@/store/UserSlice'
import React, { useState } from 'react'
import { Link,NavLink} from 'react-router-dom';
import AvatarProfile from './AvatarProfile';
import { IoHome } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { TbSearch } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BsBookmarkPlus } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { useRef } from 'react';
import { Button } from './ui/button';
import '../styles/NavBar.css';
import { SlClose } from "react-icons/sl";
import { LuSquareMenu } from "react-icons/lu";
import { useEffect } from 'react';
 
const NavBar = () => {

  const {UserId,UserName} = useUserStore();
  const navRef = useRef();
  const [openMenu,setOpenMenu]=useState(true)
  

  const updateMedia = () => {
    if(window.innerWidth>770){
        setOpenMenu(true);
    }
    if(window.innerWidth<=770){
        setOpenMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });


  const showNavBar =()=>{
    setOpenMenu(!openMenu);
  }

 
   return ( 
    <> 
    { UserId!= "" &&

<div className={openMenu?'navDiv':'closeDivMob'}>
<NavLink className='home-btn flex items-center gap-1 font-bold text-xl rounded-lg' to='/home'><IoHome />Home</NavLink>
<ul ref={navRef} className={openMenu ? 'nav-ul':"close-menu"}>
    <li >
        <NavLink to="/settings"><IoSettingsOutline />Settings</NavLink>
    </li>
    <li>
        <NavLink to="/search"><TbSearch />Search</NavLink>
    </li>
    <li>
    <NavLink to="/image/new"><IoMdAddCircleOutline />New Post</NavLink>
    </li>
    <li>
        <NavLink to="/sub"><BsBookmarkPlus />Subscription</NavLink>
    </li>
    <li>
    <NavLink to={"/profile/"+ UserId}><IoImageOutline />My Post</NavLink>
    </li>
    
</ul>
{!openMenu&& <Button className="nav-btn nav-open-btn" onClick={showNavBar}><LuSquareMenu className='scale-200' /></Button>}
{openMenu&&<Button className="nav-btn nav-close-btn" onClick={showNavBar}><SlClose className='scale-200'/></Button>}
<div className='avt flex items-center gap-1 m-1'>
<AvatarProfile/>
<h1 >{UserName}</h1>
</div>

</div>
    
    }
    
    </>)
  
}

export default NavBar