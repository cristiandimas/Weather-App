import { useState } from 'react'



const WeatherCard = ({weather, units}) => {
  const [isCelsuis, setIsCelsuis] = useState(true)

  const handleClick = () =>{
    setIsCelsuis(!isCelsuis)
  }
  console.log(weather)

  return (
    <article className='card'>
      <header>
        <h1 className='card__title'> Weather App</h1>
        <h2 className='card__subtitle'>{weather?.name}, {weather?.sys.country}</h2>
      </header>
      <main className='card__body'>
        <section className='card__icon-container'>
        <img className='card__icon' src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt='Img Weather'></img>
        </section>
        <aside className='card__contents'>
          <h3 className='card__contents-description'>"{weather?.weather[0].description}"</h3>
          <ul className="card__list-items">
            <li className="card__item"><span>Wind speed:</span> {weather?.wind.speed} m/s</li>
            <li className="card__item"><span>Clouds:</span> {weather?.clouds.all} %</li>
            <li className="card__item"><span>Pressure:</span> {weather?.main.pressure} mb</li>
            
          </ul>
        </aside>
      </main>
      <footer className='card__footer'>
        <h3 className="card__temp">{isCelsuis ? `${units?.celsius} °C` :`${units.farenheit} °F`} </h3>
        <button className="card__btn" onClick={handleClick}> {isCelsuis ? `Degreed °F` :`Degreed °C`} </button>

      </footer>

      

    </article>
  )
}

export default WeatherCard