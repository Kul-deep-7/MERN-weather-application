import axios from 'axios'


const getAPIData = async function (req, res) {
try {
        const {city} = req.body
    
        if(!city){
            return res.status(400).json({ message: "City is required" })
        }
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.APIkey}`)
        const API_data = response.data


        return res
        .status(200)
        .json(
            {
                API_data
            }
        ) 
} catch (error) {
    return res
    .status(500)
    .json({
        message: error.message
    })
    
}
}

export {getAPIData}