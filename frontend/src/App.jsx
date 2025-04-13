import React, { useState } from 'react';
import './App.css';
import {Route , BrowserRouter as Router , Routes} from 'react-router-dom';
import LandingPage from './pages/landing';
import Authentication from './pages/authentication';
import { AuthProvider } from './contexts/AuthContext';
import VideoMeetComponent from './pages/VideoMeet';
import HomeComponent from './pages/home';
import History from './pages/history';


function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div className="App">
     <Router>
      <AuthProvider>
      <Routes>
      <Route path ='/' element={<LandingPage />} />
      <Route path ='/auth' element={<Authentication />} />
      <Route path = "/home" element={<HomeComponent/>} />
      <Route path = "/history" element={<History/>} />
      <Route path ='/:url' element={<VideoMeetComponent />} />
      </Routes>
      </AuthProvider>
     </Router>
     </div>
   
  )
}

export default App
