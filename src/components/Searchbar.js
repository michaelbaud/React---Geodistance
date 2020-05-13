import React, { useState, useEffect } from 'react'

const Searchbar = ({ setPosition, setZoom, setRayon, rayon, setCity }) => {

    const [input, setInput] = useState('')
    const [suggest, setSuggest] = useState([])

    useEffect(() => {
        const getSuggest = async () => {
            try {
                if (input !== '') {
                    let response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${input}&type=municipality&autocomplete=1`)
                    const data = await response.json()
                    const features = data.features
                    setSuggest(features)
                } else {
                    setSuggest([])
                }
            } catch (err) {
                console.error('getSuggest error: ', err, err.stack)
            }
        }
        getSuggest(input)
    }, [input])

    const setNewPosition = (pos, city, cityContext) => {
        pos = [pos[1], pos[0]]
        setInput('')
        setPosition(pos)
        setRayon(rayon)
        setZoom(8)
        setCity({ city: city, cityContext: cityContext })
    }


    const displaySuggest = () => {
        const items = suggest.map(item => {
            return (
                <li key={item.properties.id} onClick={() => setNewPosition(item.geometry.coordinates, item.properties.name, item.properties.context)}>
                    <div>{item.properties.name}</div>
                    <div>{item.properties.context}</div>
                </li>
            )
        })
        return items
    }

    return (
        <div className="box">
            <form>
                <div>
                    <input
                        onChange={e => { setInput(e.target.value) }}
                        type="text" value={input} id="searchbar"
                        pattern="[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                    />
                    <label htmlFor="searchbar">Entrez votre ville ou code postal</label>
                    <ul >
                        {
                            suggest.length > 0 && displaySuggest()
                        }
                    </ul>
                </div>
            </form>
        </div>
    )
}

export default Searchbar
