import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'
import Navbar from '../NavBar/NavBar'

function FileUpload() {
  const [count, setCount] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [proceesing, setProcesing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const inputRef = useRef(null)
  const handleFile = (e) => {
    if (isUploading || proceesing) return
    setCount(e.target.files[0])
  }
  const upload = async () => {
    try {
      if (isUploading || proceesing) return
      if (!title) {
        toast.info("title is required")
        return
      }
      if (!count) {
        toast.info("select a file to upload")
        return
      }
      setIsUploading(true)
      const MAX_SIZE = 5000000 //5mb

      const counts = Math.floor(count.size / MAX_SIZE)
      let last = 0
      let chunk_count = 0
      const destination = "blob-" + uuidV4()
      for (let i = 0; i < counts; i++) {
        await uploadChunk(count, last, MAX_SIZE, i, false, destination)
        last += MAX_SIZE
        chunk_count++
      }
      await uploadChunk(count, last, count.size - last, chunk_count, true, destination, true)
    } catch (e) {
      resetState()
      toast.error(e.message)
    }
  }

  const uploadChunk = async (file, last, MAX_SIZE, current_chunk, end, destination, isEnd = false) => {
    let chunk = file.slice(last, last + MAX_SIZE, file.type)
    const formData = new FormData()
    formData.append("Content-Length", file.size)
    formData.append("Content-Range", `bytes ${last}-${last + MAX_SIZE}/${file.size}`)
    formData.append("currentchunk", current_chunk)
    formData.append("dest", destination)
    formData.append("end", end)
    formData.append("file", chunk)

    const headers = new Headers();
    headers.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OGEyNjg1YmFlZTIwMzEzNWZkZWJlYTciLCJ1c2VybmFtZSI6ImJoZWxhMTMyMzIiLCJlbWFpbCI6ImJoZWxhMnM0MzIzMjIyQGdtYWlsLmNvbSIsImlhdCI6MTc1NTQ3NDAxMSwiZXhwIjoxNzU1NDg0ODExfQ.G9aGg6F9-tuZjWwg8TPWnwi16q9Mx9ZFsf1gxjTazAk');
    const options = {
      method: 'POST',
      headers: headers,
      body: formData
    };
    if (end) {
      formData.append("title", title)
      formData.append("description", description)
      setProcesing(true)
      setIsUploading(false)
    }

    //make sure send other data before chunk file
    const data = await fetch('http://127.0.0.1:3000/uploadVideo', options)
    const json = await data.json()
    if (data.ok) {
      const progressPercentage = (((last + MAX_SIZE) - 0) / (count.size - 0) * 100)
      setProgress(progressPercentage)
    }

    if (!data.ok) {
      resetState()
      throw new Error(json.message)
    }

    if (json.status === 200) {
      toast.success("Video uploaded successfully")
      resetState()
    }
  }

  const resetState = () => {
    setProgress(0)
    setIsUploading(false)
    setProcesing(false)
    setCount(null)
    setTitle('')
    setDescription('')
    inputRef.current.value = ''
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden overflow-y-auto">
      <Navbar />
      <div className="flex items-center justify-center min-h-[90vh] py-10 px-2 sm:px-4 select-none">
        <div className="w-full max-w-md bg-gray-900/95 rounded-3xl shadow-2xl p-4 sm:p-8 flex flex-col items-center gap-6 sm:gap-7 border border-gray-800 relative z-10">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <div className="bg-blue-700/30 blur-2xl w-32 h-16 rounded-full"></div>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-blue-300 mb-1 tracking-wide drop-shadow text-center">Upload Video</h2>
          <input
            type="text"
            placeholder="Video Title"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base bg-gray-800 text-blue-100 placeholder-gray-400 shadow"
            value={title}
            onChange={e => setTitle(e.target.value)}
            disabled={isUploading || proceesing}
            maxLength={80}
          />
          <textarea
            placeholder="Video Description"
            className="w-full px-3 py-2 sm:px-4 sm:py-2 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-base resize-none bg-gray-800 text-blue-100 placeholder-gray-400 shadow"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            disabled={isUploading || proceesing}
            maxLength={300}
          />
          <label className="w-full flex flex-col items-center px-3 py-5 sm:px-4 sm:py-6 bg-gray-800/80 text-blue-200 rounded-xl shadow cursor-pointer hover:bg-gray-700 transition border border-dashed border-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10 mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span className="text-base font-medium text-center break-all">{count ? count.name : "Choose a video file"}</span>
            <input
              ref={inputRef}
              type="file"
              onChange={handleFile}
              accept="video/*"
              className="hidden"
              disabled={isUploading || proceesing}
            />
          </label>
          <button
            onClick={upload}
            className={`w-full py-2 rounded-xl font-bold text-lg shadow transition-all duration-200 ${
              isUploading || proceesing
                ? "bg-blue-900 text-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
            }`}
            disabled={isUploading || proceesing}
          >
            {isUploading ? "Uploading..." : proceesing ? "Processing..." : "Upload"}
          </button>
          {count && (
            <div className="w-full mt-1">
              <div className="flex justify-between text-xs text-blue-400 mb-1">
                <span className="truncate max-w-[90px] sm:max-w-[120px]">{count.name}</span>
                <span>{Math.floor(progress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
          {(isUploading || proceesing) && (
            <div className="flex items-center gap-2 mt-2 text-blue-400 font-medium">
              <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              {isUploading ? "Uploading..." : "Processing..."}
            </div>
          )}
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          theme="dark"
          pauseOnHover={false}
          transition={Bounce}
          progressClassName={"progress-bar"}
        />
      </div>
      {/* Decorative blurred circles for background */}
      <div className="pointer-events-none fixed top-[-120px] left-[-120px] w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-blue-900 rounded-full blur-3xl opacity-30 z-0"></div>
      <div className="pointer-events-none fixed bottom-[-100px] right-[-100px] w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-blue-700 rounded-full blur-2xl opacity-20 z-0"></div>
    </div>
  )
}

export default FileUpload
