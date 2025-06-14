import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Auth0Provider } from '@auth0/auth0-react';

const queryClient = new QueryClient()
/*
const domainauth = import.meta.env.VITE_AUTH0_DOMAIN;
const clid = import.meta.env.VITE_AUTH0_CLIENT_ID;
*/

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QueryClientProvider>

  </StrictMode> 
)
