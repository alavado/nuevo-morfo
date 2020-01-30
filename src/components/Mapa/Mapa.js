import React, { useState, useMemo, useCallback } from 'react'
import ReactMapGL, { FullscreenControl, NavigationControl, Marker, Popup } from 'react-map-gl'
import InfoContenido from '../InfoContenido'
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa'
import { useSelector, useDispatch } from 'react-redux'
import query from '../../queries/contenido'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { fijarContenido, agregarMarcadorAImagenActual, eliminarMarcadorDeImagenActual } from '../../redux/actions'
import agregarMarcadorMutation from '../../mutations/agregarMarcador'
import eliminarMarcadorMutation from '../../mutations/eliminarMarcador'

const { minZoom, maxZoom, marcador, tamañoMarcador } = parametrosMapa

const Mapa = ({ match }) => {

  const dispatch = useDispatch()
  const [popup, setPopup] = useState({
    activo: false,
    lat: 0,
    lng: 0,
    titulo: ''
  })
  const contenido = useSelector(state => state.contenido.contenido)
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => dispatch(fijarContenido(data.contenido))
  })
  const [agregarMarcador, { dataNuevoMarcador }] = useMutation(agregarMarcadorMutation)
  const [eliminarMarcador, { idMarcadorEliminado }] = useMutation(eliminarMarcadorMutation)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom,
  })
  const mapStyle = useMemo(() => {
    return contenido && contenido.imagenes ? construirMapStyle(contenido.imagenes[0].id) : ''
  }, [contenido])

  const crearMarcador = useCallback((id, lat, lng, titulo) => (
    <Marker key={id} latitude={lat} longitude={lng}>
      <svg
        height={tamañoMarcador}
        viewBox="0 0 24 24"
        style={{
          cursor: 'pointer',
          fill: '#d6001c',
          stroke: 'none',
          transform: `translate(${-tamañoMarcador / 2}px, ${-tamañoMarcador}px)`
        }}
        onContextMenu={e => {
          e.preventDefault()
          dispatch(eliminarMarcadorDeImagenActual(id))
          eliminarMarcador({ variables: { id } })
        }}
        onClick={() => setPopup({
          ...popup,
          activo: true,
          titulo,
          lat,
          lng
        })}
      >
        <path d={parametrosMapa.marcador} />
      </svg>
    </Marker>
  ), [marcador])

  const actualizarVP = vp => {
    vp.zoom = Math.max(minZoom, vp.zoom)
    vp.zoom = Math.min(maxZoom, vp.zoom)
    setViewport({
      ...vp, 
      width: '100%',
      height: 'calc(100vh - 64px)',
    })
  }

  const onLeftClick = e => {
    e.preventDefault()
    const [lng, lat] = e.lngLat
    agregarMarcador({
      variables: {
        imagen: contenido.imagenes[0].id,
        titulo: 'prueba',
        posicion: `${lat},${lng}`
      }
    })
    .then(({ data }) => {
      const { id, titulo, posicion } = data.agregarMarcador
      dispatch(agregarMarcadorAImagenActual({ id, titulo, posicion }))
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={actualizarVP}
      mapStyle={mapStyle}
      dragRotate={false}
      onContextMenu={onLeftClick}
    >
      <div style={{ position: 'absolute', left: 16, top: 16, zIndex: 2 }}>
        <div style={{ marginBottom: 8 }}>
          <FullscreenControl />
        </div>
        <NavigationControl
          captureScroll={true}
          showCompass={false}
          zoomInLabel="Acercar"
          zoomOutLabel="Alejar"
          style={{ padding: '119px' }}
        />
      </div>
      {/* <div style={{ position: 'absolute', right: 0, top: 0, zIndex: 2 }}>
        <InfoContenido />
      </div> */}
      {contenido && contenido.imagenes &&
        contenido.imagenes[0].marcadores.map(({ id, titulo, posicion }) => {
          const [lat, lng] = posicion.split(',').map(Number)
          return crearMarcador(id, lat, lng, `${titulo}-${id}`)
        })
      }
      
      {popup.activo && <Popup
        tipSize={5}
        anchor="top"
        longitude={popup.lng}
        latitude={popup.lat}
        closeOnClick={false}
        onClose={() => setPopup({ ...popup, activo: false })}
      >
        <div>
          {popup.titulo}
        </div>
      </Popup>}
    </ReactMapGL>
  )
}

export default Mapa
