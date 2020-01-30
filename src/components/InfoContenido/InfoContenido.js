import React from 'react'
import './InfoContenido.css'
import { useSelector } from 'react-redux'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)

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
        {imagen.marcadores.map(({ id, titulo }) => <li key={id}>{titulo}</li>)}
      </ul>
    </div>
  )
}

export default InfoContenido
