import React from 'react'
import './Miniaturas.css'
import { useSelector } from 'react-redux'

const Miniaturas = () => {

  const { contenido } = useSelector(state => state.contenido)

  return (
    <div className="miniaturas">
      {contenido.imagenes.map(({ archivo }) => (
        <img alt="imagen contenido" src={`http://localhost:1027/thumbnail/${archivo}`} />
      ))}
    </div>
  )
}

export default Miniaturas
