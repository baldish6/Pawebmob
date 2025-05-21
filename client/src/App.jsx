import './App.css'
import { Button } from "@/components/ui/button"
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Image from './pages/Image';
import NewImage from './pages/NewImage';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div>
       <Routes>
        <Route path='/'>
            <Route path='login' element={<Login/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path="image">
              <Route path=":id" element={<Image />} />
              <Route path="new" element={<NewImage />} />
            </Route>
        </Route>
        <Route path="*" element={<NotFound/>} />
       </Routes>
    </div>
  )
}

export default App
