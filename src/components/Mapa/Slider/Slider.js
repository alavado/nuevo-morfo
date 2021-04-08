import { useMutation } from '@apollo/react-hooks'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { esAdmin } from '../../../helpers/auth'
import { isDev } from '../../../helpers/dev'
import agregarMarcadorMutation from '../../../mutations/agregarMarcador'
import { agregarMarcadorAImagenActual, mostrarEdicionMarcador, mostrarImagenDeContenido, mostrarPopup } from '../../../redux/actions'
import './range.css'
import './Slider.css'

const obtenerUrlImagen = archivo => {
  return `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/foto/${archivo}`
}

const Slider = () => {

  const { usuario } = useSelector(state => state.auth)
  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const imagenRef = useRef()
  const dispatch = useDispatch()
  const [agregarMarcador] = useMutation(agregarMarcadorMutation)

  const onLeftClick = e => {
    e.preventDefault()
    if (!usuario || !esAdmin(usuario)) {
      return
    }
    const rect = imagenRef.current.getBoundingClientRect()
    const x = 100 * (e.clientX - rect.left) / rect.width
    const y = 100 * (e.clientY - rect.top ) / rect.height
    console.log(contenido.imagenes[indiceImagenActual].id)
    agregarMarcador({
      variables: {
        imagen: contenido.imagenes[indiceImagenActual].id,
        titulo: 'Nueva estructura',
        lat: y,
        lng: x
      }
    })
    .then(({ data }) => {
      const marcador = data.agregarMarcador
      dispatch(agregarMarcadorAImagenActual(marcador))
      dispatch(mostrarPopup(marcador))
      dispatch(mostrarEdicionMarcador())
    })
  }

  console.log(contenido)

  return (
    <div className="Slider">
      <div
        className="Slider__contenedor_imagen"
        onContextMenu={onLeftClick}
      >
        {contenido.imagenes[indiceImagenActual].marcadores.map((m, i) => (
          <div
            key={`slider-marcador-imagen-${i}`}
            className="Slider__marcador_imagen"
            style={{ left: `${m.lng}%`, top: `${m.lat}%` }}
          >
          </div>
        ))}
        <img
          ref={imagenRef}
          className="Slider__imagen"
          alt={`slider-imagen-${indiceImagenActual}`}
          src={obtenerUrlImagen(contenido.imagenes[indiceImagenActual].archivo)}
          draggable={false}
        />
      </div>
      <input
        type="range"
        className="Slider__control"
        min={0}
        max={contenido.imagenes.length - 1}
        value={indiceImagenActual}
        onChange={e => dispatch(mostrarImagenDeContenido(+e.target.value))}
      />
    </div>
  )
}

export default Slider
