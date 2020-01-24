import React, { useState, useMemo, useCallback } from 'react'
import ReactMapGL, { FullscreenControl, NavigationControl, Marker } from 'react-map-gl'
import InfoContenido from '../InfoContenido';
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa';
import { useSelector } from 'react-redux';

const Mapa = () => {

  const { minZoom, maxZoom, marcador, tamañoMarcador } = parametrosMapa

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom,
  })

  const marcadores = [
    {
      lat: 79.61614103319404,
      lng: -109.68750000000037
    },
    {
      lat: 79.61614103319404,
      lng: -65.68750000000037,
    }
  ]

  const contenido = useSelector(state => state.contenido.contenido)
  const mapStyle = useMemo(() => contenido ? construirMapStyle(contenido.imagenes[0]) : '', [contenido])

  const crearMarcador = useCallback(
    (lat, lng) => (
      <Marker latitude={lat} longitude={lng}>
        <svg
          height={tamañoMarcador}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#D6001C',
            stroke: 'none',
            transform: `translate(${-tamañoMarcador / 2}px, ${-tamañoMarcador}px)`
          }}
        >
          <path d={parametrosMapa.marcador} />
        </svg>
      </Marker>
    ),
    [marcador],
  )
  

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
      {marcadores.map(({ lat, lng }) => crearMarcador(lat, lng))}
    </ReactMapGL>
  )
}

export default Mapa
