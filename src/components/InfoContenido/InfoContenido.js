import React from 'react'
import './InfoContenido.css'
import { useSelector } from 'react-redux'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)

  if (!contenido) {
    return 'cargando...'
  }

  return (
    <div className="info-contenido">
      <h3>{contenido.titulo}</h3>
      <p>{contenido.descripcion}</p>
      <h4>Estructuras</h4>
      <ul className="lista-marcadores">
        {imagen.marcadores.map(({ id, titulo }) => <li key={id}>{titulo}</li>)}
      </ul>
    </div>
  )
}

export default InfoContenido
