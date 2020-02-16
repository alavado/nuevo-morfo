import React from 'react'
import './Miniaturas.css'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
      <button title="Agregar imagen">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}

export default Miniaturas
