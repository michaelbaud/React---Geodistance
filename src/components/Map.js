import React, { useState, useEffect } from "react"
import L from "leaflet"

const style = {
    width: "100%",
    height: "300px",
    maxWidth: "1000px",
    margin: "50px auto",
    borderRadius: "10px"
}

let map = null
let markerLayer = null
let rayonLayer = null

const Map = ({ position, zoom, rayon }) => {

    const renderMap = () => map = new L.map('map')

    const setLayer = () => L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map)


    const [firstRendering, setFirstRendering] = useState(true)

    useEffect(() => {

        const addMarker = pos => {
            markerLayer = new L.marker(pos)
            map.addLayer(markerLayer)
        }

        const addRayon = (pos) => {
            rayonLayer = L.circle(pos, { radius: rayon })
            console.log(rayon)
            map.addLayer(rayonLayer)
        }

        if (firstRendering) {
            renderMap()
            setLayer()
            setFirstRendering(false)
            return
        }
        if (markerLayer !== null) {
            if (rayonLayer !== null) {
                map.removeLayer(rayonLayer)
            }
            map.removeLayer(markerLayer)
            map.setView(position, zoom)
            addMarker(position)
            addRayon(position)
        } else {
            map.setView(position, zoom)
            addMarker(position)
        }




    }, [position, zoom, rayon, firstRendering])


    return <div id="map" style={style} />
}

export default Map
