import React from 'react'
import './Miniaturas.css'
import { useSelector } from 'react-redux'

const Miniaturas = () => {

  const { contenido } = useSelector(state => state.contenido)

  return (
    <div className="miniaturas">
      {contenido.imagenes.map(({ archivo }, i) => (
        <img
          key={`miniatura-${i}`}
          src={`http://localhost:1027/thumbnail/${archivo}`}
          alt="imagen contenido"
        />
      ))}
    </div>
  )
}

export default Miniaturas
