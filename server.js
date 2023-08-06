const express = require('express');
const axios = require('axios');

const app = express();
const port =process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/weather', async(req,res)=>{
    try{
        const location = req.query.location;
        const apiKey ='a3e9f654d8503bc06810b44ed628d7af';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${apiKey}`;
        

        const  response = await axios.get(apiUrl);
        const weatherData= {
            temperature: response.data.main.temp,
            humidity: response.data.main.humidity,
            description: response.data.weather[0].description,
        };
       // console.log(response.data.main.humidity);
        res.json(weatherData);
    }catch(error){
        console.error('Error fetching weather data:', error);
        res.status(500).json({error:'An error occured while fetching weather data.'})
    }

});
  
  // Handle root URL
  app.get('/', (req, res) => {
    res.send('Weather App Server is running.');
  });

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});