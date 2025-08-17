import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import FileUpload from '../FileUpload/FileUpload'
import VideoContainer from '../Videos/VideoContainer'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<VideoContainer />} />
        <Route path="/uploadfile" element={<FileUpload />}/>
      </Routes>
    </BrowserRouter>
  )
}
