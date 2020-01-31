import React from 'react'
import './Miniaturas.css'
import { useSelector } from 'react-redux'

const Miniaturas = () => {

  const { imagen } = useSelector(state => state.contenido)

  return (
    <div className="miniaturas">
      <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
      <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
      <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
    </div>
  )
}

export default Miniaturas
