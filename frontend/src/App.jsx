import { useState } from 'react'
import axios from 'axios'

function App() {
  const [city,setCity ] = useState('')
  const [loading, setLoading] = useState(false)
  const [temperature, setTemperature] = useState('')
  const [cityName, setcityName]= useState('')
  const [weather, setWeather]= useState('')

  const handleSubmit = async()=>{
    if (!city) {
      alert("Enter a city")
      return
    }
    setTemperature('')
    setLoading(true)
    setcityName(city)
  
    try {
      const res = await axios.get(`http://localhost:5000/api/weather?city=${city}`)
      const tempK = res.data.API_data.main.temp
      const tempC = ( tempK - 273.15).toFixed(2)
      setTemperature(tempC)
      setWeather(res.data.API_data.weather[0].description)
    } catch (error) {
       console.error("Error fetching dataoka:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4">

      <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-8 text-white transition-all duration-500">

        <h1 className="text-3xl font-semibold text-center mb-6 tracking-wide">
          Weather App
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-300 transition"
          />

          <button
            onClick={handleSubmit}
            className="px-5 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition duration-300 shadow-lg hover:shadow-blue-500/40"
          >
            Search
          </button>
        </div>

        {cityName && (
          loading ? (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="text-center space-y-3 animate-fadeIn">

              <h2 className="text-xl text-gray-300">
                {cityName}
              </h2>

              {temperature ? (
                <>
                  <h1 className="text-6xl font-light tracking-tight">
                    {temperature}°
                  </h1>

                  <p className="text-lg text-gray-300 capitalize">
                    {weather}
                  </p>
                </>
              ) : (
                <p className="text-red-300">
                  No data available for {cityName}
                </p>
              )}

            </div>
          )
        )}

      </div>

    </div>
  )
}

export default App



/*
A && B example: 

If A is false → JavaScript stops immediately and returns A
If A is true → JavaScript returns B


chatgpt explaination
Let's Walk Through Your Code Slowly

Your state at start:

city = ""
cityName = ""
temperature = ""
loading = false

Then React renders this:

<h1>City : {cityName}</h1>

This becomes:

City :

(empty… awkward silence)

Then this runs:

temperature ? (...) : (<p>no data available for {cityName}</p>)

Since:

temperature = "" → false
So React shows:
no data available for 

Boom 💥
Even though user never searched.

The Real Logic You Want

You only want UI to show after search happens.

So we ask React:

"Has user searched anything yet?"

That's where this condition helps:

{cityName && ( ... )}
What does cityName && (...) mean?

This is JavaScript magic:

cityName && showUI

Means:

If cityName exists → show UI
If cityName empty → show nothing
Example
When App Opens
cityName = ""

So:

"" && showUI

Result:

Nothing renders

Perfect ✅

When User Searches "Pune"
cityName = "Pune"

Now:

"Pune" && showUI

Result:

UI appears

Perfect again 🎯

Visual Timeline
App Opens
Weather App

[ input box ]

(nothing below)
User Searches Pune
Weather App

[ input box ]

City : Pune
28°C
User Searches Invalid City
Weather App

[ input box ]

City : Goal
No data available for Goal
This is called "Conditional Rendering"

React only shows UI when condition is true

Like a door 🚪

false → door closed
true → door open

Your UI is behind that door.

Final Code Structure (Clean Mental Model)
{cityName && (
  UI block
)}

Meaning:

"Only show UI if cityName exists"


*/