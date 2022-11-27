import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Loading from './components/Loading'
import WeatherCard from './components/WeatherCard'


function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [units, setUnits] = useState(true)

  const success = pos => {    
    setCoords({
      lat: pos.coords.latitude ,
      lon: pos.coords.longitude      
    })
  } 

  useEffect(() => {    
    navigator.geolocation.getCurrentPosition(success)
}, [])

useEffect(() => {
  if(coords){
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=13583e394f61276defa0312d7bac8d89`)
    .then((res) => {  setWeather(res.data); 
      const celsius =  (res.data.main.temp - 273.15).toFixed(1)
      const farenheit = (celsius * (9/5) + 32).toFixed(1) 
      setUnits({celsius,farenheit})
      
    }).catch((err) => { console.error(err)      
    });
  } 
}, [coords])

switch(weather?.weather[0].main){
  case "Rain":
    document.body.style.backgroundImage = "url('./rainy.jpg')";
    break;
  case "Clouds":
    document.body.style.backgroundImage = "url('./cloudy.jpg')";
    break;
  case "Clear":
    document.body.style.backgroundImage = "url('./clear.jpg')";
    break;
    case "Snow":
      document.body.style.backgroundImage = "url('./snowing.jpg')";
      break;
  default:
    document.body.style.backgroundImage = "url('./fair.jpg')";
    break;
} 

  return (
    <div className="App" >
     {
      weather ?
      <WeatherCard 
      weather = {weather}
      units = {units}
      />
      : <Loading />
     }

    </div>
  )
}

export default App
