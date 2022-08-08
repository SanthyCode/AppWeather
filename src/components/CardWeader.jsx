import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const CardWeader = ({ lat, lon }) => {
    const [weather, setWeather] = useState()
    const [temperture, setTemperture] = useState()
    const [isCelsuis, setIsCelsuis] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    
    

    useEffect(() => {
        if (lat) {
            const APIKey = '1fdff1a973e9bd14f59b3ce36f4fbaf4'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

            axios.get(URL)
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9 / 5 +32)} °F`,
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`
                    }
                    setTemperture(temp)
                    setIsLoading(false)

                })
                .catch(err => console.log(err))

        }
    }, [lat, lon])

const handleClick = () => setIsCelsuis(!isCelsuis)

if (isLoading){
   return <Loading />
} else {
    return (
        <div className='Card'>
            <h1>Weather App</h1>
            <h2>{weather?.name}, {weather?.sys.country}</h2>
            <section className='Card__container'>
                <div className='Card__image'>
            <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            <h3>{isCelsuis ? temperture?.celsius : temperture?.fahrenheit}</h3>
            </div>
            <div className='Card__info'>
            <ul>
                <li className='card-li'>"{weather?.weather[0].description}"</li>
                <li>🌬 Wind speed <span>{weather?.wind.speed} m/s</span></li>
                <li>☁  Clouds: <span>{weather?.clouds.all}%</span></li>
                <li>🔗 Pressure: <span>{weather?.main.pressure} hPa</span></li>
            </ul>
            </div>
            </section>
            <button onClick={handleClick}>{isCelsuis ? 'Change to °F':'Change to °C'}</button>
        </div>
    )

}


}

export default CardWeader