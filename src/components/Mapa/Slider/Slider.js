import { useMutation } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { esAdmin } from '../../../helpers/auth'
import { isDev } from '../../../helpers/dev'
import agregarMarcadorMutation from '../../../mutations/agregarMarcador'
import { agregarMarcadorAImagenActual, mostrarEdicionMarcador, mostrarImagenDeContenido, mostrarPopup } from '../../../redux/actions'
import MarcadorSlider from './MarcadorSlider'
import './range.css'
import './Slider.css'

const obtenerUrlImagen = archivo => {
  return `${isDev ? 'http://localhost:1027' : 'https://compsci.cl/nuevo-morfo'}/foto/${archivo}`
}

const Slider = () => {

  const { usuario } = useSelector(state => state.auth)
  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [agregarMarcador] = useMutation(agregarMarcadorMutation)

  const onLeftClick = e => {
    e.preventDefault()
    if (!usuario || !esAdmin(usuario)) {
      return
    }
    const rect = document.getElementById(`imagen-slider-${indiceImagenActual}`).getBoundingClientRect()
    const x = 100 * (e.clientX - rect.left) / rect.width
    const y = 100 * (e.clientY - rect.top ) / rect.height
    agregarMarcador({
      variables: {
        imagen: contenido.imagenes[indiceImagenActual].id,
        titulo: 'Nueva estructura',
        lat: y,
        lng: x,
        color: '#ff0000'
      }
    })
    .then(({ data }) => {
      const marcador = data.agregarMarcador
      dispatch(agregarMarcadorAImagenActual(marcador))
      dispatch(mostrarPopup(marcador))
      dispatch(mostrarEdicionMarcador())
    })
  }

  return (
    <div className="Slider">
      <div
        className="Slider__contenedor_imagen"
        onContextMenu={onLeftClick}
      >
        {contenido.imagenes[indiceImagenActual].marcadores.map((m, i) => (
          <MarcadorSlider key={`slider-marcador-imagen-${i}`} marcador={m} />
        ))}
        {contenido.imagenes.map((img, i) => (
          <img
            key={`imagen-slider-${i}`}
            alt={`slider-imagen-${i}`}
            src={obtenerUrlImagen(img.archivo)}
            id={`imagen-slider-${i}`}
            style={{ display: indiceImagenActual === i ? 'block' : 'none' }}
            className="Slider__imagen"
          />
        ))}
        {/* <img
          ref={imagenRef}
          className="Slider__imagen"
          alt={`slider-imagen-${indiceImagenActual}`}
          src={obtenerUrlImagen(contenido.imagenes[indiceImagenActual].archivo)}
          draggable={false}
        /> */}
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
