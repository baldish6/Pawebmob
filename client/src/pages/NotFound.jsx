import React from 'react'
import { useLocation } from 'react-router-dom'
const NotFound = () => {
  const {pathname} = useLocation();

  return (
    <div>
      <h1>404 Not found</h1>
      <h1>Bad Url : the URL <b className='text-2xl'>{pathname}</b> does not exist</h1>
      </div>
  )
}

export default NotFound