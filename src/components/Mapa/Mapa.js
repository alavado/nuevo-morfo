import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const Mapa = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -109.68750000000037,
    zoom: 2.5,
  })

  const mapStyle = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'http://localhost:1027/foto/{z}/{x}/{y}'
        ],
        tileSize: 512,
        attribution: 'Imágenes propiedad del <a target="_blank" rel="noopener" href="http://www.medicina.uchile.cl/facultad/campus-y-departamentos/campus-norte/anatomia-y-medicina-legal">Departamento de Anatomía y Medicina Legal</a> de la <a target="_blank" rel="noopener" href="https://uchile.cl">Universidad de Chile</a>'
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
    vp.longitude = Math.max(-75.515, vp.longitude)
    vp.latitude = Math.max(56.63, vp.latitude)
    vp.longitude = Math.min(-53.662, vp.longitude)
    vp.zoom = Math.max(2.5, vp.zoom)
    vp.zoom = Math.min(6, vp.zoom)
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
    </ReactMapGL>
  )
}

export default Mapa
