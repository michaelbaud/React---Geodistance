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

const Map = ({ position, zoom, rayon, city }) => {

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
            map.addLayer(rayonLayer)
        }

        if (firstRendering) {
            renderMap()
            setLayer()
            map.setView(position, zoom)
            setFirstRendering(false)
            return
        } else {
            if (markerLayer !== null) {
                map.removeLayer(markerLayer)
                map.removeLayer(rayonLayer)
                map.setView(position, zoom)
                addMarker(position)
                addRayon(position)
            } else {
                map.setView(position, zoom)
                addMarker(position)
                addRayon(position)
            }

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, rayon, zoom])


    return (
        <div className="mapBoxContainer">
            <div>
                <span className="city">{city.city}</span>
                <br />
                <span className="context">{city.cityContext}</span>
            </div>
            <div id="map" style={style} />
        </div>
    )
}

export default Map
