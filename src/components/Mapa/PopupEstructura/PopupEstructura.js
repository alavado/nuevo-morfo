import React, { useEffect } from 'react'
import { Popup } from 'react-map-gl'
import './PopupEstructura.css'
import { useSelector, useDispatch } from 'react-redux'
import { parametrosMapa } from '../../../helpers/mapa'
import { esconderPopup, eliminarMarcadorDeImagenActual, fijarDestino, mostrarEdicionMarcador, esconderEdicionMarcador } from '../../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import eliminarMarcadorMutation from '../../../mutations/eliminarMarcador'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import { faEdit as iconoEditar } from '@fortawesome/free-solid-svg-icons'
import FormularioEdicionMarcador from './FormularioEdicionMarcador'

const { tamañoMarcador } = parametrosMapa

const PopupEstructura = () => {

  const { popup, editandoMarcador } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [eliminarMarcadorMutate] = useMutation(eliminarMarcadorMutation)

  const esconderEdicion = () => {
    dispatch(esconderPopup())
    dispatch(esconderEdicionMarcador())
  }

  useEffect(() => esconderEdicion, [])

  if (!popup) {
    return null
  }

  const eliminarMarcador = e => {
    e.stopPropagation()
    dispatch(eliminarMarcadorDeImagenActual(popup.id))
    dispatch(esconderPopup())
    eliminarMarcadorMutate({ variables: { id: popup.id } })
  }

  const mostrarFormularioEditarMarcador = e => {
    e.stopPropagation()
    dispatch(mostrarEdicionMarcador())
  }

  return (
    <Popup
      tipSize={5}
      anchor="bottom"
      offsetTop={-tamañoMarcador}
      longitude={Number(popup.lng)}
      latitude={Number(popup.lat)}
      closeOnClick={false}
      onClose={esconderEdicion}
      className="popup-estructura"
    >
      <div
        className="contenido-popup"
        onClick={() => dispatch(fijarDestino({ lat: Number(popup.lat), lng: Number(popup.lng) }))}
      >
        {editandoMarcador ?
          <FormularioEdicionMarcador /> :
          <>
            <p>{popup.titulo}</p>
            <div className="botones">
              <button title="Editar marcador" onClick={mostrarFormularioEditarMarcador}>
                <FontAwesomeIcon icon={iconoEditar} size="sm" />
              </button>
              <button title="Eliminar marcador" onClick={eliminarMarcador}>
                <FontAwesomeIcon icon={iconoEliminar} size="sm" />
              </button>
            </div>
          </>
        }
      </div>
    </Popup>
  )
}

export default PopupEstructura
