import React from 'react'
import Navbar from '../NavBar/NavBar'
import VideoCard from './VideoCard'
import { useState } from 'react'
import { useEffect } from 'react'



export default function VideoContainer() {
  const [videos,setVideos] = useState([])
  const headers = new Headers();
  headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGEyNjg1YmFlZTIwMzEzNWZkZWJlYTciLCJ1c2VybmFtZSI6ImJoZWxhMTMyMzIiLCJlbWFpbCI6ImJoZWxhMnM0MzIzMjIyQGdtYWlsLmNvbSIsImlhdCI6MTc1NTc5MjU0NiwiZXhwIjoxNzU1ODAzMzQ2fQ.Z7yB0a-dZbjDg5dLi9ETJgUTuYPKtO8K_2HjjaBAuHo');
  const options = {
    method: "GET",
    headers: headers,
  };
  const getVideos = async () => {
    const res = await fetch("http://127.0.0.1:3000/getVideos", options)
    const data = await res.json()
    setVideos(data?.data)
    console.log()
  }

  useEffect(() => {
    getVideos()
  },[])
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative">
      <div className='sticky top-0 z-50 '>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-1">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10 z-0 relative mt-10">
          {videos.map((video,index) => (
            <VideoCard key={index} title={video.title} description={video.description} duration={video.duration}  />
          ))}
        </div>
      </div>
      {/* Decorative blurred circles for background */}
      <div className="pointer-events-none fixed top-[-120px] left-[-120px] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-900 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="pointer-events-none fixed bottom-[-100px] right-[-100px] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-blue-700 rounded-full blur-2xl opacity-10 z-0"></div>
    </div>
  )
}