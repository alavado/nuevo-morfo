import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const Mapa = () => {

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100vh',
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
        tileSize: 256,
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

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={setViewport}
      mapStyle={mapStyle}
    />
  )
}

export default Mapa
