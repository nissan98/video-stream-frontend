import React from 'react'


export default function VideoCard({ title = "nature video", description = "a beutiful nature vidro", duration = 120 }) {
  const handleDurationFormat = () => {
    const duration_trunc = Math.trunc(duration)
    if (duration_trunc < 60) {
      return `00:00:${duration_trunc}`
    }
    return -1
  }
  return (
    <div className="max-h-[450px] bg-gradient-to-br  from-gray-900 via-gray-800 to-gray-900 border border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:shadow-blue-900/40 hover:scale-[1.025] transition-transform duration-200 w-full max-w-full group">
      <div className="relative w-full aspect-video bg-black">
        <img
          src={'https://picsum.photos/100/100'}
          alt={title}
          className="w-full h-[300px]  object-cover group-hover:brightness-90 transition"
          loading="lazy"

        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-white px-2 py-0.5 rounded font-mono tracking-wider">
          {handleDurationFormat(duration)}
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
          <h3 className="text-blue-100 font-semibold text-base mb-0.5 truncate group-hover:text-blue-400 transition">{title}</h3>
          <p className="text-gray-400 text-xs mb-1 truncate">{description}</p>
          <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
            <span className="flex items-center gap-1 justify-center">
              <svg className="w-4 h-4 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              {20}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A2 2 0 0021 6.382V5a2 2 0 00-2-2H5a2 2 0 00-2 2v1.382a2 2 0 001.447 1.342L9 10m6 0v4m0 0l-6 3m6-3l-6-3" />
              </svg>
              {100} views
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
