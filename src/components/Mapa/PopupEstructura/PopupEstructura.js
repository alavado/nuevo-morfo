import React, { useEffect } from 'react'
import { Popup } from 'react-map-gl'
import './PopupEstructura.css'
import { useSelector, useDispatch } from 'react-redux'
import { parametrosMapa } from '../../../helpers/mapa'
import { esconderPopup, eliminarMarcadorDeImagenActual, fijarDestino, mostrarEdicionMarcador, esconderEdicionMarcador } from '../../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import mutation from '../../../mutations/eliminarMarcador'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import { faEdit as iconoEditar } from '@fortawesome/free-solid-svg-icons'

const { tamañoMarcador } = parametrosMapa

const PopupEstructura = () => {

  const { popup, editandoMarcador } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [eliminarMarcadorMutation] = useMutation(mutation)

  useEffect(() => () => {
    dispatch(esconderPopup())
    dispatch(esconderEdicionMarcador())
  }, [])

  useEffect(() => {
    dispatch(esconderEdicionMarcador())
  }, [popup])

  if (!popup) {
    return null
  }

  const eliminarMarcador = () => {
    const { id } = popup
    dispatch(eliminarMarcadorDeImagenActual(id))
    dispatch(esconderPopup())
    eliminarMarcadorMutation({ variables: { id } })
  }

  const editarMarcador = () => {
    const { id } = popup
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
      onClose={() => {
        dispatch(esconderPopup())
        dispatch(esconderEdicionMarcador())
      }}
      className="popup-estructura"
    >
      <div
        className="contenido-popup"
        onClick={() => dispatch(fijarDestino({ lat: Number(popup.lat), lng: Number(popup.lng) }))}
      >
        {editandoMarcador ?
          <form>
            <input type="text" />
            <input type="submit" value="Aceptar" />
          </form> :
          <>
            <p>{popup.titulo}</p>
            <div className="botones">
              <button title="Editar marcador" onClick={editarMarcador}>
                <FontAwesomeIcon icon={iconoEditar} size="xs" />
              </button>
              <button title="Eliminar marcador" onClick={eliminarMarcador}>
                <FontAwesomeIcon icon={iconoEliminar} size="xs" />
              </button>
            </div>
          </>
        }
      </div>
    </Popup>
  )
}

export default PopupEstructura
