import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import FileUpload  from "./FileUpload/FileUpload"
import Home from  "./Home/Home"
import VideoContainer from './Videos/VideoContainer'
import Navbar from './NavBar/NavBar'
export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadvideo" element={<FileUpload />}/>
        <Route path='/videos' element={<VideoContainer />}/>
      </Routes>
    </BrowserRouter>
  )
}
