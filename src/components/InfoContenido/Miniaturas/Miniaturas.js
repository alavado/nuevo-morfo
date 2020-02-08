import React from 'react'
import './Miniaturas.css'
import { useSelector } from 'react-redux'

const Miniaturas = () => {

  const { imagen } = useSelector(state => state.contenido)

  return (
    <div className="miniaturas">
      <img alt="imagen 1" src={`http://localhost:1027/thumbnail/${imagen.id}`} />
      <img alt="imagen 2" src={`http://localhost:1027/thumbnail/${imagen.id}`} />
      <img alt="imagen 3" src={`http://localhost:1027/thumbnail/${imagen.id}`} />
    </div>
  )
}

export default Miniaturas
