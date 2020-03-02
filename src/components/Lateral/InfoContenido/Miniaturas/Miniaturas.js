import React from 'react'
import './Miniaturas.css'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { mostrarFormularioNuevaImagen, mostrarImagenDeContenido } from '../../../../redux/actions'

const Miniaturas = () => {

  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="miniaturas">
      {contenido.imagenes.map(({ archivo }, i) => (
        <img
          key={`miniatura-${i}`}
          src={`http://localhost:1027/thumbnail/${archivo}`}
          alt="imagen contenido"
          onClick={() => dispatch(mostrarImagenDeContenido(i))}
          className={indiceImagenActual === i ? 'imagen-seleccionada' : ''}
        />
      ))}
      {usuario && <button title="Agregar imagen" onClick={() => dispatch(mostrarFormularioNuevaImagen())}>
        <FontAwesomeIcon icon={faPlus} />
      </button>}
    </div>
  )
}

export default Miniaturas
