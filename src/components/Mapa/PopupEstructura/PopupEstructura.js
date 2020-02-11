import React from 'react'
import { Popup } from 'react-map-gl'
import './PopupEstructura.css'
import { useSelector, useDispatch } from 'react-redux'
import { parametrosMapa } from '../../../helpers/mapa'
import { esconderPopup, eliminarMarcadorDeImagenActual } from '../../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import mutation from '../../../mutations/eliminarMarcador'

const { tamañoMarcador } = parametrosMapa

const PopupEstructura = () => {

  const popup = useSelector(state => state.contenido.popup)
  const dispatch = useDispatch()
  const [eliminarMarcadorMutation] = useMutation(mutation)

  if (!popup) {
    return null
  }

  const eliminarMarcador = () => {
    const { id } = popup
    dispatch(eliminarMarcadorDeImagenActual(id))
    dispatch(esconderPopup())
    eliminarMarcadorMutation({ variables: { id } })
  }

  return (
    <Popup
      tipSize={5}
      anchor="bottom"
      offsetTop={-tamañoMarcador}
      longitude={Number(popup.lng)}
      latitude={Number(popup.lat)}
      closeOnClick={false}
      onClose={() => dispatch(esconderPopup())}
    >
      <div className="contenido-popup">
        {popup.titulo}
        <button onClick={eliminarMarcador}>Eliminar</button>
      </div>
    </Popup>
  )
}

export default PopupEstructura
