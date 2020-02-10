import React, { useState, useMemo, useEffect } from 'react'
import ReactMapGL, { FullscreenControl, NavigationControl, FlyToInterpolator } from 'react-map-gl'
import { construirMapStyle, parametrosMapa } from '../../helpers/mapa'
import { useSelector, useDispatch } from 'react-redux'
import { fijarContenido, agregarMarcadorAImagenActual, fijarDestino } from '../../redux/actions'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../queries/contenido'
import agregarMarcadorMutation from '../../mutations/agregarMarcador'
import Marcador from './Marcador'
import PopupEstructura from './PopupEstructura'
import './Mapa.css'
import { useParams } from 'react-router-dom'

const { minZoom, maxZoom } = parametrosMapa

const Mapa = () => {

  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const destino = useSelector(state => state.mapa.destino)
  const dispatch = useDispatch()
  const { id } = useParams()

  const { loading, error, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => dispatch(fijarContenido(data.contenido))
  })
  const [agregarMarcador, { dataNuevoMarcador }] = useMutation(agregarMarcadorMutation)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 64px)',
    latitude: 79.61614103319404,
    longitude: -65.68750000000037,
    zoom: minZoom
  })

  const mapStyle = useMemo(() => {
    if (!contenido || !contenido.imagenes) {
      return ''
    }
    return construirMapStyle(contenido.imagenes[indiceImagenActual].archivo)
  }, [contenido, indiceImagenActual])

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
        imagen: contenido.imagenes[indiceImagenActual].id,
        titulo: 'prueba',
        lat,
        lng
      }
    })
    .then(({ data }) => {
      const { id, titulo, lat, lng } = data.agregarMarcador
      dispatch(agregarMarcadorAImagenActual({ id, titulo, lat, lng }))
    })
  }

  useEffect(() => {
    if (destino) {
      setViewport(v => ({
        ...v,
        latitude: Number(destino.lat),
        longitude: Number(destino.lng),
        transitionInterpolator: new FlyToInterpolator({ speed: 1.5 }),
        transitionDuration: 'auto'
      }))
      dispatch(fijarDestino(null))
    }
  }, [destino])

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
      {contenido && contenido.imagenes && contenido.imagenes[indiceImagenActual].marcadores.map(({ id, titulo, lat, lng }) => {
        return <Marcador key={id} id={id} lat={lat} lng={lng} titulo={`${titulo}-${id}`} />
      })}
      <PopupEstructura />
    </ReactMapGL>
  )
}

export default Mapa
