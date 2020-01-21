import React, { useState } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl'

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
const SIZE = 20;

const Mapa = () => {

  const MIN_ZOOM = 1.4, MAX_ZOOM = 5

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -109.68750000000037,
    zoom: MIN_ZOOM,
  })

  const mapStyle = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          window.location.href.indexOf('localhost') < 0 ? 'https://compsci.cl:1027/foto/{z}/{x}/{y}' : 'http://localhost:1027/foto/{z}/{x}/{y}'
        ],
        tileSize: 256,
        attribution: `
          ® Imágenes propiedad del
          <a target="_blank" rel="noopener" href="http://www.medicina.uchile.cl/facultad/campus-y-departamentos/campus-norte/anatomia-y-medicina-legal">
            Departamento de Anatomía y Medicina Legal
          </a>
          de la
          <a target="_blank" rel="noopener" href="https://uchile.cl">
            Universidad de Chile
          </a>
        `
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles'
      }
    ]
  }

  const test = vp => {
    console.log({vp})
    // vp.longitude = Math.max(-41.21381995432413, vp.longitude)
    // vp.latitude = Math.max(56.63, vp.latitude)
    // vp.longitude = Math.min(-53.662, vp.longitude)
    vp.zoom = Math.max(MIN_ZOOM, vp.zoom)
    vp.zoom = Math.min(MAX_ZOOM, vp.zoom)
    setViewport({
      ...vp, 
      width: '100%',
      height: 'calc(100vh - 64px)',
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={test}
      mapStyle={mapStyle}
    >
      <Marker latitude={79.61614103319404} longitude={-109.68750000000037}>
        <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
        >
          <path d={ICON} />
        </svg>
      </Marker>
    </ReactMapGL>
  )
}

export default Mapa
