import React, { useEffect, useState } from 'react'
import { Popup } from 'react-map-gl'
import './PopupEstructura.css'
import { useSelector, useDispatch } from 'react-redux'
import { parametrosMapa } from '../../../helpers/mapa'
import { esconderPopup, eliminarMarcadorDeImagenActual, fijarDestino, mostrarEdicionMarcador, esconderEdicionMarcador } from '../../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import eliminarMarcadorMutation from '../../../mutations/eliminarMarcador'
import editarMarcadorMutation from '../../../mutations/editarMarcador'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import { faEdit as iconoEditar } from '@fortawesome/free-solid-svg-icons'

const { tamañoMarcador } = parametrosMapa

const PopupEstructura = () => {

  const { popup, editandoMarcador } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [eliminarMarcadorMutate] = useMutation(eliminarMarcadorMutation)
  const [editarMarcadorMutate] = useMutation(editarMarcadorMutation)
  const [titulo, setTitulo] = useState('')

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

  const { id } = popup

  const eliminarMarcador = () => {
    dispatch(eliminarMarcadorDeImagenActual(id))
    dispatch(esconderPopup())
    eliminarMarcadorMutate({ variables: { id } })
  }

  const mostrarFormularioEditarMarcador = () => {
    dispatch(mostrarEdicionMarcador())
  }

  const editarMarcador = e => {
    e.preventDefault()
    editarMarcadorMutate({ variables: { id, titulo } })
      .then(() => {
        dispatch(esconderEdicionMarcador())
      })
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
          <form onSubmit={editarMarcador} onClick={e => e.stopPropagation()}>
            <input
              type="text"
              defaultValue={popup.titulo}
              autoFocus
              onFocus={e => e.target.select()}
              onChange={e => setTitulo(e.target.value)}
            />
            <input type="submit" value="Aceptar" />
          </form> :
          <>
            <p>{popup.titulo}</p>
            <div className="botones">
              <button title="Editar marcador" onClick={mostrarFormularioEditarMarcador}>
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
