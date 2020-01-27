import React, { useState, useMemo, useCallback } from 'react'
import ReactMapGL, { FullscreenControl, NavigationControl, Marker } from 'react-map-gl'
import InfoContenido from '../InfoContenido';
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa';
import { useSelector, useDispatch } from 'react-redux';
import query from '../../queries/contenido'
import { useQuery, useMutation } from '@apollo/react-hooks';
import { fijarContenido, agregarMarcadorAImagenActual } from '../../redux/actions';
import agregarMarcadorMutation from '../../mutations/agregarMarcador'

const { minZoom, maxZoom, marcador, tamañoMarcador } = parametrosMapa

const Mapa = ({ match }) => {

  const dispatch = useDispatch()
  const contenido = useSelector(state => state.contenido.contenido)
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => dispatch(fijarContenido(data.contenido))
  })
  const [agregarMarcador, { dataNuevoMarcador }] = useMutation(agregarMarcadorMutation);

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom,
  })
  const mapStyle = useMemo(() => contenido && contenido.imagenes ? construirMapStyle(contenido.imagenes[0].id) : '', [contenido])

  const crearMarcador = useCallback((id, lat, lng) => (
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

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={actualizarVP}
      mapStyle={mapStyle}
      dragRotate={false}
      onContextMenu={e => {
        e.preventDefault()
        const [lng, lat] = e.lngLat
        agregarMarcador({
          variables: {
            imagen: contenido.imagenes[0].id,
            titulo: 'prueba',
            posicion: `${lat},${lng}`
          }
        })
        .then(data => {
          const { id, titulo, posicion } = data.data.agregarMarcador
          dispatch(agregarMarcadorAImagenActual({ id, titulo, posicion }))
        })
      }}
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
          return crearMarcador(id, lat, lng)
        })
      }
    </ReactMapGL>
  )
}

export default Mapa
