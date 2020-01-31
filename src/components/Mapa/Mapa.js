import React, { useState, useMemo, useEffect } from 'react'
import ReactMapGL, { FullscreenControl, NavigationControl, Popup } from 'react-map-gl'
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa'
import { useSelector, useDispatch } from 'react-redux'
import { fijarContenido, agregarMarcadorAImagenActual } from '../../redux/actions'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../queries/contenido'
import agregarMarcadorMutation from '../../mutations/agregarMarcador'
import Marcador from './Marcador'
import './Mapa.css'

const { minZoom, maxZoom, tamañoMarcador } = parametrosMapa

const Mapa = ({ match }) => {

  const {contenido, imagen} = useSelector(state => state.contenido)
  const marcadorDestacado = useSelector(state => state.contenido.marcadorDestacado)
  const dispatch = useDispatch()
  const [popup, setPopup] = useState({
    activo: false,
    lat: 0,
    lng: 0,
    titulo: ''
  })

  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => dispatch(fijarContenido(data.contenido))
  })
  const [agregarMarcador, { dataNuevoMarcador }] = useMutation(agregarMarcadorMutation)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom,
  })

  const mapStyle = useMemo(() => imagen ? construirMapStyle(imagen.id) : '', [contenido, imagen])

  useEffect(() => {
    if (marcadorDestacado) {
      const { titulo, posicion } = marcadorDestacado
      const [lat, lng] = posicion.split(',').map(Number)
      setPopup(p => ({
        ...p,
        titulo,
        lat,
        lng,
        activo: true
      }))
    }
    else {
      setPopup(p => ({ ...p, activo: false }))
    }
  }, [marcadorDestacado])

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
        imagen: imagen.id,
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
      {imagen && imagen.marcadores.map(({ id, titulo, posicion }) => {
          const [lat, lng] = posicion.split(',').map(Number)
          return <Marcador id={id} lat={lat} lng={lng} titulo={`${titulo}-${id}`} setPopup={setPopup} />
        })
      }
      {popup.activo && <Popup
        tipSize={5}
        anchor="bottom"
        offsetTop={-tamañoMarcador}
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
