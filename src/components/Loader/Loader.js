import React from 'react'
import './Loader.css'
import Loader from 'react-loader-spinner'

const MiLoader = () => {
  return (
    <div className="contenedor-loader">
      <Loader
        type="TailSpin"
        color="#D5001C"
        height={64}
        width={64}
      />
    </div>
  )
}

export default MiLoader
