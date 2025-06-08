import './App.css'
import { Button } from "@/components/ui/button"
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Image from './pages/Image';
import NewImage from './pages/NewImage';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';


function App() {
  return (
    <div>
       <NavBar/>
       <Routes>
       <Route  path='/' element={<Login/>}/>
       <Route  path='/login' element={<Login/>}/>
       <Route path='/home' element={<Home/>}/>
       <Route path='/settings' element={<Settings/>}/>
       <Route path='/profile/:id' element={<Profile/>}/>
       <Route path="/image">
              <Route path=":id" element={<Image />} />
              <Route path="new" element={<NewImage />} />
        </Route>
        <Route path="*" element={<NotFound/>} />
       </Routes>
    </div>
  )
}

export default App
