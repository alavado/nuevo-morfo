import React, { useState } from 'react'
import './Slider.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarImagenDeContenido } from '../../redux/actions'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Slider = () => {

  const { indiceImagenActual, contenido } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [abierto, setAbierto] = useState(true)

  if (!contenido) {
    return '...'
  }

  return (
    <div className={`Slider${abierto ? ' Slider--abierto' : ''}`}>
      <div
        className="Slider__boton_cerrar"
        onClick={() => setAbierto(!abierto)}
      >
        <FontAwesomeIcon icon={abierto ? faCaretRight : faCaretLeft} />
        <div className="Slider__boton_cerrar_texto">
          {abierto ? 'Ocultar' : 'Mapa general'}
        </div>
      </div>
      <div className="Slider__contenedor_pierna">
        {contenido.imagenes.map(({ archivo }, i) => (
          <img
            key={`miniatura-${i}`}
            src={`http://localhost:1027/thumbnail/${archivo}`}
            alt="imagen contenido"
            onClick={() => dispatch(mostrarImagenDeContenido(i))}
            className={`Miniaturas__miniatura_imagen${indiceImagenActual === i ? ' Miniaturas__miniatura_imagen_seleccionada' : ''}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider
