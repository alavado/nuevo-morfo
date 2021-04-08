import React, { useState, useEffect } from 'react'
import './Cortes.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarImagenDeContenido } from '../../redux/actions'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import pierna from '../../assets/pierna.png'
import Draggable from 'react-draggable';

const Cortes = () => {

  const { indiceImagenActual, contenido } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [abierto, setAbierto] = useState(false)
  const [imagenes, setImagenes] = useState([])

  useEffect(() => {
    if (contenido && contenido.imagenes) {
      setImagenes(contenido.imagenes.map(img => ({ ...img, y: 0 })))
    }
  }, [contenido])

  if (!imagenes) {
    return '...'
  }

  const test = (e, i) => {
    setImagenes(prev => {
      prev[i].y = e.y - e.offsetY - 55
      console.log((e.y - e.offsetY - 55) / (window.innerHeight - 55))
      return [...prev]
    })
  }

  return (
    <div className={`Cortes${abierto ? ' Cortes--abierto' : ''}`}>
      <div
        className="Cortes__boton_cerrar"
        onClick={() => setAbierto(!abierto)}
      >
        <FontAwesomeIcon icon={abierto ? faCaretRight : faCaretLeft} />
        <div className="Cortes__boton_cerrar_texto">
          Cortes
        </div>
      </div>
      <div className="Cortes__contenedor_pierna">
        <img alt="Fondo cortes" className="Cortes__imagen_fondo" src={pierna} />
        {imagenes.map((imagen, i) => (
          <div
            className="Cortes__marcador_y"
            key={`marcador-imagen-${i}`}
            style={{
              top: imagen.y,
              backgroundColor: indiceImagenActual === i ? '#D4001C' : 'rgba(255, 255, 255, .8)'
            }}
            onClick={() => dispatch(mostrarImagenDeContenido(i))}
          >
          </div>
        ))}
        {imagenes.map(({ archivo }, i) => (
          <Draggable
            key={`miniatura-Cortes-${i}`}
            onDrag={e => test(e, i)}
            bounds="parent"
          >
            <img
              src={`http://localhost:1027/thumbnail/${archivo}`}
              alt="imagen contenido"
              onClick={() => dispatch(mostrarImagenDeContenido(i))}
              className={`Cortes__miniatura_imagen${indiceImagenActual === i ? ' Cortes__miniatura_imagen_seleccionada' : ''}`}
            />
          </Draggable>
        ))}
      </div>
    </div>
  )
}

export default Cortes
