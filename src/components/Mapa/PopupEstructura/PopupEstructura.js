import React from 'react'
import { Popup } from 'react-map-gl'
import './PopupEstructura.css'
import { useSelector, useDispatch } from 'react-redux'
import { parametrosMapa } from '../../../helpers/mapa'
import { esconderPopup } from '../../../redux/actions'

const { tamañoMarcador } = parametrosMapa

const PopupEstructura = () => {

  const popup = useSelector(state => state.contenido.popup)
  const dispatch = useDispatch()

  if (!popup) {
    return null
  }

  return (
    <Popup
      tipSize={5}
      anchor="bottom"
      offsetTop={-tamañoMarcador}
      longitude={popup.lng}
      latitude={popup.lat}
      closeOnClick={false}
      onClose={() => dispatch(esconderPopup())}
    >
      <div>
        {popup.titulo}
      </div>
    </Popup>
  )
}

export default PopupEstructura
