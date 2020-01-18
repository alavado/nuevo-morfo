import React, { useState } from 'react'
import ReactMapGL from 'react-map-gl'

const Mapa = () => {

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    zoom: 5,
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
        attribution: 'Map tiles by <a target="_top" rel="noopener" href="http://stamen.com">Stamen Design</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a target="_top" rel="noopener" href="http://openstreetmap.org">OpenStreetMap</a>, under <a target="_top" rel="noopener" href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
      }
    },
    layers: [
      {
        id: 'simple-tiles',
        type: 'raster',
        source: 'raster-tiles',
        minzoom: 0,
        maxzoom: 5
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
