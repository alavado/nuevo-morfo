import React from 'react'
import './InfoContenido.css'
import { useSelector, useDispatch } from 'react-redux'
import { destacarMarcador, dejarDeDestacarMarcador } from '../../redux/actions'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)
  const dispatch = useDispatch()

  if (!contenido || !imagen) {
    return 'cargando...'
  }

  return (
    <div className="info-contenido">
      <h3>{contenido.titulo}</h3>
      <p>{contenido.descripcion}</p>
      <div className="miniaturas">
        <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
        <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
        <img src={`http://localhost:1027/thumbnail/${imagen.id}`} />
      </div>
      <h4>Estructuras</h4>
      <ul className="lista-marcadores">
        {imagen.marcadores.map(marcador => (
          <li
            key={marcador.id}
            onMouseEnter={() => dispatch(destacarMarcador(marcador))}
            onMouseLeave={() => dispatch(dejarDeDestacarMarcador())}
          >
            <a>{marcador.titulo} - {marcador.id}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default InfoContenido
