import React, { useState } from 'react'
import ReactMapGL, { FlyToInterpolator, LinearInterpolator } from 'react-map-gl'

const Mapa = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
    latitude: 79.61614103319404,
    longitude: -109.68750000000037,
    zoom: 3,
  })

  const mapStyle = {
    version: 8,
    sources: {
      'raster-tiles': {
        type: 'raster',
        tiles: [
          'http://localhost:5000/foto/{z}/{x}/{y}'
        ],
        // bounds: [46.679604169812826, -160.6640624999998, 82.10632423435905, 31.376953125005794],
        tileSize: 512,
        attribution: 'Imágenes propiedad del <a target="_top" rel="noopener" href="https://uchile.cl">Departamento de Anatomía y Medicina Legal</a> de la <a target="_top" rel="noopener" href="https://uchile.cl">Universidad de Chile</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 8
      }
    ]
  }

  const test = vp => {
    setViewport({
      ...vp, 
      width: '100%',
      height: '100vh'
    })
  }

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={test}
      mapStyle={mapStyle}
    />
  )
}

export default Mapa
