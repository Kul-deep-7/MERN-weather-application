import { useState } from 'react'
import axios from 'axios'

function App() {
  const [city,setCity ] = useState('')
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState('')


  const handleSubmit = async()=>{
    if (!city) {
      alert("Enter a city")
      return
    }
    setTemperature('')
    setLoading(true)
  
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`)
      const tempK = res.data.API_data.main.temp
      const tempC = ( tempK - 273.15).toFixed(2)
      setTemperature(tempC)
      console.log(res.data)
    } catch (error) {
       console.error("Error fetching dataoka:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <h1>Weather APP</h1>
    <div>
      <input type='text'
      placeholder='Enter city name...' 
      value={city} 
      onChange={(e)=>setCity(e.target.value)}/>
      <button onClick={handleSubmit}>Search</button>
    </div>

    {loading ? (<p>Loading...</p> 
    ):( 
      <>
      <h1>City : {city}</h1>
      {temperature ? (
        <h3>{temperature}°celsius</h3>
        )   :  loading ? 
        (<p>Loading...</p>
        )   :   
        (`no data available for ${city}`
      )}
      </>
    )}
    

    </>
  )
}

export default App
