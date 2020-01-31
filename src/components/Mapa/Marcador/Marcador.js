import React from 'react'
import { Marker } from 'react-map-gl'
import { useSelector, useDispatch } from 'react-redux'
import { eliminarMarcadorDeImagenActual } from '../../../redux/actions'
import { useMutation } from '@apollo/react-hooks'
import eliminarMarcadorMutation from '../../../mutations/eliminarMarcador'
import { parametrosMapa } from '../../../helpers/mapa'
import './Marcador.css'

const { tamañoMarcador } = parametrosMapa

const Marcador = props => {

  const { id, lat, lng, titulo, setPopup } = props
  const marcadorDestacado = useSelector(state => state.contenido.marcadorDestacado)
  const dispatch = useDispatch()
  const [eliminarMarcador, { idMarcadorEliminado }] = useMutation(eliminarMarcadorMutation)

  return (
    <Marker key={id} latitude={lat} longitude={lng}>
      <svg
        height={tamañoMarcador}
        viewBox="0 0 24 24"
        className={marcadorDestacado && marcadorDestacado.id === id ? 'marcador-destacado' : 'marcador'}
        style={{
          opacity: marcadorDestacado && marcadorDestacado.id !== id ? 0.4 : 1, 
          transform: `translate(${-tamañoMarcador / 2}px, ${-tamañoMarcador}px)`
        }}
        onContextMenu={e => {
          e.preventDefault()
          dispatch(eliminarMarcadorDeImagenActual(id))
          eliminarMarcador({ variables: { id } })
        }}
        onClick={() => setPopup(p => ({
          ...p,
          activo: true,
          titulo,
          lat,
          lng
        }))}
      >
        <path d={parametrosMapa.marcador} />
      </svg>
    </Marker>
  )
}

export default Marcador
