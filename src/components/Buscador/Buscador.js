import React, { useEffect, useRef } from 'react'
import './Buscador.css'
import { useSelector } from 'react-redux'

const Buscador = () => {

  const { activa } = useSelector(state => state.navegacion)

  return (
    <div className={`contenedor-buscador${activa ? ' compacto': ''}`}>
      Esto es morfo
    </div>
  )
}

export default Buscador
