import { useState } from 'react'
import axios from 'axios'

function App() {
  const [weather,getweather ] = useState('')
  const [loading, setLoading] = useState(false)
  const [get, setget] = useState('')


  const handleSubmit = async()=>{
  
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${weather}`)
      setget(res.data)
      console.log(res.data)
    } catch (error) {
       console.error("Error fetching comments:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <h1>Weather APP</h1>
    <div>
      <input type='text' value={weather} onChange={(e)=>getweather(e.target.value)}/>
      <button onClick={handleSubmit}>Search</button>
    </div>
    </>
  )
}

export default App
