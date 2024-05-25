import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import MainPage from './Pages/MainPage';
import Search_Ideas from './components/Ideas_Component/Search_Ideas';
import Submit_Ideas from './components/Ideas_Component/Submit_Ideas';
import Profile from './components/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<MainPage/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/search" element={<Search_Ideas/>}/>
        <Route path="/ideas" element={<Submit_Ideas/>}/> 
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  )
}

export default App