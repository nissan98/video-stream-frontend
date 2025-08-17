import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'
import { useRef } from 'react'
import { ToastContainer } from 'react-toastify'
import { toast } from 'react-toastify'
import { Bounce } from 'react-toastify'

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
      if (!title){
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 select-none">
      <div className="w-full max-w-sm bg-gray-900 rounded-2xl shadow-lg p-6 flex flex-col items-center gap-5 border border-gray-800">
        <h2 className="text-xl font-bold text-blue-300 mb-1">Upload Video</h2>

        <input
          type="text"
          placeholder="Video Title"
          className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-gray-800 text-blue-100 placeholder-gray-400"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isUploading || proceesing}
        />
        <textarea
          placeholder="Video Description"
          className="w-full px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm resize-none bg-gray-800 text-blue-100 placeholder-gray-400"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
          disabled={isUploading || proceesing}
        />

        <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-800 text-blue-200 rounded-lg shadow cursor-pointer hover:bg-gray-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span className="text-sm font-medium">Choose a video file</span>
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
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${isUploading || proceesing
            ? "bg-blue-900 text-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          disabled={isUploading || proceesing}
        >
          {isUploading ? "Uploading..." : proceesing ? "Processing..." : "Upload"}
        </button>

        {count && (
          <div className="w-full mt-1">
            <div className="flex justify-between text-xs text-blue-400 mb-1">
              <span className="truncate max-w-[120px]">{count.name}</span>
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
  )
}

export default FileUpload
