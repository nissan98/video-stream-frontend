import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(null)

  const handleFile =(e)=>{
    setCount(prev => e.target.files[0])
    
  }
  const upload = ()=>{
    
    const counts = Math.floor(count.size / 160000)//16kb
    alert(count.size / 160000)
    let last = 0
    for (let i=0;i<counts;i++){
      alert(last+160000)
      last += 160000
    }
  
  alert(count.size - last)
  }

  return (
    <>
      <h1 >File Upload {count?.size}</h1>
      
        <input type='file' onChange={handleFile}/>
        <button onClick={upload}>Upload</button>

    </>
  )
}

export default App
