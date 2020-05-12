import React, { useState } from 'react'
import '../css/App.css'

// Components
import Searchbar from './Searchbar'
import Map from './Map'
import RangeBar from './RangeBar'

function App() {

  const [position, setPosition] = useState([46.7984347777073, 2.351667868749998])
  const [rayon, setRayon] = useState(100000)
  const [zoom, setZoom] = useState(5)

  return (
    <div className="App">
      <h1>Géodistance</h1>
      <Searchbar setPosition={setPosition} setZoom={setZoom} setRayon={setRayon} />
      <RangeBar setRayon={setRayon} />
      <Map position={position} zoom={zoom} rayon={rayon} />
    </div>
  )
}

export default App
