import React from 'react'
import './InfoContenido.css'
import { useSelector } from 'react-redux'
import ListaEstructuras from './ListaEstructuras/ListaEstructuras'
import Miniaturas from './Miniaturas'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)

  if (!contenido || !imagen) {
    return 'cargando...'
  }

  return (
    <div className="info-contenido">
      <h3>{contenido.titulo}</h3>
      <p>{contenido.descripcion}</p>
      <Miniaturas />
      <ListaEstructuras />
    </div>
  )
}

export default InfoContenido
