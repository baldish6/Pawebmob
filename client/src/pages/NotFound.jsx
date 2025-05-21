import React from 'react'
import { Button } from "@/components/ui/button"

const NotFound = () => {
  return (
    <div><div className="flex flex-col items-center justify-center min-h-svh">
        <Button onClick={()=>{console.log("clicked")}} >Click me</Button>
      </div></div>
  )
}

export default NotFound