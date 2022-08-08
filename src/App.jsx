import { useEffect, useState } from 'react'
import './App.css'
import CardWeader from './components/CardWeader'

function App() {

  const [coords, setCoords] = useState()

  useEffect(() => {

    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latlon)
    }


    navigator.geolocation.getCurrentPosition(success);

  }, [])


  return (
    <div className="App">

      <CardWeader lat={coords?.lat} lon={coords?.lon} />

    </div>
  )
}

export default App
