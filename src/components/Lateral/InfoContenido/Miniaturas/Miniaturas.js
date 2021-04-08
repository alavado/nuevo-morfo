import React from 'react'
import './Miniaturas.css'
import { isDev } from '../../../../helpers/dev'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { mostrarFormularioNuevaImagen, mostrarImagenDeContenido } from '../../../../redux/actions'
import { esAdmin } from '../../../../helpers/auth'

const Miniaturas = () => {

  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <div className="Miniaturas">
      {contenido.imagenes.filter(i => !i.esCorte).map(({ archivo }, i) => (
        <img
          key={`miniatura-${i}`}
          src={`${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/thumbnail/${archivo}`}
          alt="imagen contenido"
          onClick={() => dispatch(mostrarImagenDeContenido(i))}
          className={`Miniaturas__miniatura_imagen${indiceImagenActual === i ? ' Miniaturas__miniatura_imagen_seleccionada' : ''}`}
        />
      ))}
      {usuario && esAdmin(usuario) &&
        <button
          title="Agregar imagen"
          onClick={() => dispatch(mostrarFormularioNuevaImagen())}
          className="Miniaturas__boton_agregar_imagen"
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      }
    </div>
  )
}

export default Miniaturas
