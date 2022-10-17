import React from 'react'
import './Loader.css'

function Loader({text}) {
  return (
      <div className='loadingText'>
            <p></p>
            <span>Loading {text}...</span>
      </div>
  )
}

export default Loader