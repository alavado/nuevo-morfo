import React, { useEffect, useRef } from 'react'
import './Buscador.css'
import { useSelector } from 'react-redux'

const Buscador = () => {

  const { activa } = useSelector(state => state.navegacion)
  const contenedor = useRef()

  useEffect(() => {
    if (activa) {
      contenedor.current.classList.add('compacto')
    }
    else {
      contenedor.current.classList.remove('compacto')
    }
  }, [activa])

  return (
    <div ref={contenedor} className="contenedor-buscador">
      Esto es morfo
    </div>
  )
}

export default Buscador
