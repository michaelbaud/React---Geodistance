import React, { useState } from 'react'

// Dependencies
import Slider from 'react-rangeslider'

// CSS
import 'react-rangeslider/lib/index.css'

const RangeBar = ({ setRayon }) => {

    const [value, setValue] = useState(100)

    const handleChange = newValue => {
        setValue(newValue)
        setRayon(newValue * 1000)
    }

    return (
        <div className='slider'>
            <div className='value'>Rayon de {value} km</div>
            <Slider
                min={0}
                max={100}
                value={value}
                tooltip={false}
                onChange={handleChange}
            />
        </div>
    )
}

export default RangeBar
