import React from 'react'
import './Relleno.css'
import { useSelector } from 'react-redux'

const Relleno = () => {

  const { nuevoContenido } = useSelector(state => state.contenido)

  return (
    <div className="relleno-stripes">
      <div className="mensaje">
        { nuevoContenido.subiendo && 'subiendo...' }
      </div>
    </div>
  )
}

export default Relleno
