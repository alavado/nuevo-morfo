import { useState } from 'react'
import { useSelector } from 'react-redux'
import { isDev } from '../../../helpers/dev'
import './range.css'
import './Slider.css'

const obtenerUrlImagen = archivo => {
  return `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/foto/${archivo}`
}

const Slider = () => {

  const [indiceImagen, setIndiceImagen] = useState(0)
  const { contenido } = useSelector(state => state.contenido)

  console.log(contenido)

  return (
    <div className="Slider">
      <div className="Slider__contenedor_imagen">
        <img
          className="Slider__imagen"
          alt={`slider-imagen-${indiceImagen}`}
          src={obtenerUrlImagen(contenido.imagenes[indiceImagen].archivo)}
        />
      </div>
      <input
        type="range"
        className="Slider__control"
        min={0}
        max={contenido.imagenes.length - 1}
        onChange={e => setIndiceImagen(+e.target.value)}
      />
    </div>
  )
}

export default Slider
