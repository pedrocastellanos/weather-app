import { useState, useEffect } from 'react'
import './App.css'
import {dateBuilder} from './dataBuilder.js'

function App() {
  const [query, setQuery] = useState("Havana")
  const [data, setData] = useState({
    cityName: "La Habana, Cuba",
    country: "",
    date: "",
    weather_el: "",
    temp_min: "",
    temp_max: "",
    temp: ""
  })

  const handleQuery = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=2fa73590fd8b5a4c6e68098ad5625395`)
      .then((weather) => {
        return weather.json();
      })
      .then(data => {
        setData({
          cityName: data.name,
          country: data.sys.country,
          date: dateBuilder(new Date()),
          weather_el: data.weather[0].main,
          temp_min: data.main.temp_min,
          temp_max: data.main.temp_max,
          temp: Math.round(data.main.temp),
        })
      });
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    handleQuery()
  }

  useEffect(() => {
    handleQuery()
  }, [])
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" autoComplete="off" className="search-box" placeholder="Search for a city" onChange={(e)=>setQuery(e.target.value)}/>
      </form>
      <main>
        <section className="location">
          <div className="city">{data.cityName}</div>
          <div className="date">{data.date}</div>
        </section>

        <div className="current">
          <div className="temp">{data.temp}<span>°C</span></div>
          <div className="weather">{data.weather_el}</div>
          <div className="hi-low">{data.temp_min}°C / {data.temp_max}°C</div>
        </div>
      </main>
    </>
  )
}

export default App
