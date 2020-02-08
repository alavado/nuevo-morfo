import React, { useEffect, useRef } from 'react'
import './Buscador.css'
import { useSelector } from 'react-redux'

const Buscador = () => {

  const { seccion } = useSelector(state => state.navegacion)
  const contenedor = useRef()

  useEffect(() => {
    if (seccion) {
      contenedor.current.classList.add('compacto')
    }
    else {
      contenedor.current.classList.remove('compacto')
    }
  }, [seccion])

  return (
    <div ref={contenedor} className="contenedor-buscador">
      Esto es morfo
    </div>
  )
}

export default Buscador
