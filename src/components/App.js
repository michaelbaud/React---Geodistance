import React, { useState } from 'react'
import '../css/App.css'

// Components
import Searchbar from './Searchbar'
import Map from './Map'
import RangeBar from './RangeBar'
import Footer from './Footer'

function App() {

  const [position, setPosition] = useState([46.7984347777073, 2.351667868749998])
  const [rayon, setRayon] = useState(100000)
  const [zoom, setZoom] = useState(5)
  const [city, setCity] = useState({})

  return (
    <div className="App">
      <h1>Géodistance</h1>
      <Searchbar setPosition={setPosition} setZoom={setZoom} rayon={rayon} setRayon={setRayon} setCity={setCity} />
      <RangeBar setRayon={setRayon} />
      <Map position={position} zoom={zoom} rayon={rayon} city={city} />
      <Footer />
    </div>
  )
}

export default App
