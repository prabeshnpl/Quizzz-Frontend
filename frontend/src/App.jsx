import { useState } from 'react'
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Score_board from './pages/Score-Board';
import About from './pages/about';
import Register from './pages/register';
import './App.css'
import HomePage from './pages/Home';
import Login from './pages/login';
import { AuthProvider } from './context/authcontext'; 

function App() {
       return (
        
          <Router>
               <AuthProvider>
                    <Navbar/>
                    <main>
                         <Routes>
                              <Route path='/' element={<HomePage/>} />
                              <Route path='/Score-Board' element={<Score_board/>}/>
                              <Route path='/about' element={<About/>}/>
                              <Route path='/login' element={<Login/>}/>
                              <Route path='/register' element={<Register/>}/>
                         </Routes>
                    </main>
               </AuthProvider>
          </Router>
        
       )
}

export default App
