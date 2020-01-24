import React, { useState, useMemo } from 'react'
import ReactMapGL, { Marker, FullscreenControl, NavigationControl } from 'react-map-gl'
import { isDev } from '../../helpers/dev';
import InfoContenido from '../InfoContenido';
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa';

const { minZoom, maxZoom, marcador, tamañoMarcador } = parametrosMapa

const Mapa = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom,
  })

  const idImagen = 'IMG_0688'
  const mapStyle = useMemo(() => construirMapStyle(idImagen), [idImagen])

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
      <Marker latitude={79.61614103319404} longitude={-109.68750000000037}>
        <svg
          height={tamañoMarcador}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#D6001C',
            stroke: 'none',
            transform: `translate(${-tamañoMarcador / 2}px,${-tamañoMarcador}px)`
          }}
        >
          <path d={marcador} />
        </svg>
      </Marker>
    </ReactMapGL>
  )
}

export default Mapa
