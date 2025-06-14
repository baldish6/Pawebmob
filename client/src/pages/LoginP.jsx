import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button';

const LoginP = () => {

    const {
        loginWithPopup,
        loginWithRedirect,
        logout

    }=useAuth0();

    const LogPop =()=>{
        loginWithPopup();
    }

    const LogRed =()=>{
        loginWithRedirect();
    }

    const Logot =()=>{
        logout();
    }


  return (
    <div>
        <h1>Auth0 auth</h1>
        <ul>
            <li>
                <Button onClick={LogPop}>Login with Popup</Button>
            </li>
            <li>
                <Button onClick={LogRed}>Login with Redirecct</Button>
            </li>
            <li>
                <Button onClick={Logot}>Logout</Button>
            </li>
        </ul>
    </div>
  )
}

export default LoginP