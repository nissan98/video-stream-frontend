import React from 'react'
import Navbar from '../NavBar/NavBar'

// Expanded dummy video data array for demonstration
const videos = [
  {
    id: 1,
    title: "Nature Walk",
    description: "A relaxing walk through the forest.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    likes: 124,
    views: 2300,
    uploadedAt: "2025-08-15"
  },
  {
    id: 2,
    title: "City Timelapse",
    description: "Fast-paced city life in motion.",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    likes: 98,
    views: 1800,
    uploadedAt: "2025-08-14"
  },
  {
    id: 3,
    title: "Mountain Adventure",
    description: "Exploring the mountains.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    likes: 210,
    views: 3200,
    uploadedAt: "2025-08-10"
  },
  {
    id: 4,
    title: "Ocean Waves",
    description: "Soothing ocean waves for relaxation.",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
    likes: 156,
    views: 2900,
    uploadedAt: "2025-08-12"
  },
  {
    id: 5,
    title: "Desert Journey",
    description: "A journey through the desert landscape.",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumbnail: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    likes: 87,
    views: 1100,
    uploadedAt: "2025-08-11"
  },
  {
    id: 6,
    title: "Rainy Day",
    description: "Enjoy the calmness of a rainy day.",
    url: "https://www.w3schools.com/html/movie.mp4",
    thumbnail: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
    likes: 132,
    views: 2100,
    uploadedAt: "2025-08-09"
  }
]

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function VideoCard({ video }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-blue-900/40 hover:scale-[1.025] transition-transform duration-200 w-full max-w-full group">
      <div className="relative w-full aspect-video bg-black">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:brightness-90 transition"
          loading="lazy"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-white px-2 py-0.5 rounded font-mono tracking-wider">
          4:20
        </div>
        <div className="absolute top-2 left-2 bg-blue-700/80 text-xs text-white px-2 py-0.5 rounded-full shadow">
          HD
        </div>
      </div>
      <div className="flex gap-3 p-4 pb-3">
        {/* Channel/user avatar placeholder */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-400 flex items-center justify-center text-white font-bold text-lg shadow border-2 border-blue-500">
          V
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-blue-100 font-semibold text-base mb-0.5 truncate group-hover:text-blue-400 transition">{video.title}</h3>
          <p className="text-gray-400 text-xs mb-1 truncate">{video.description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {video.likes}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 001.447 1.342L9 10m6 0v4m0 0l-6 3m6-3l-6-3" />
              </svg>
              {video.views} views
            </span>
            <span className="italic text-gray-500">{formatDate(video.uploadedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VideoContainer() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative">
      <div className='sticky top-0 z-50 '>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-7 gap-y-10 z-0 relative mt-10">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
      {/* Decorative blurred circles for background */}
      <div className="pointer-events-none fixed top-[-120px] left-[-120px] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-900 rounded-full blur-3xl opacity-20 z-0"></div>
      <div className="pointer-events-none fixed bottom-[-100px] right-[-100px] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-blue-700 rounded-full blur-2xl opacity-10 z-0"></div>
    </div>
  )
}