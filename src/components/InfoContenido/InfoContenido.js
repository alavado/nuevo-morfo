import React from 'react'
import './InfoContenido.css'
import { useSelector } from 'react-redux'

const InfoContenido = () => {

  const imagen = useSelector(state => state.contenido.imagen)

  return (
    <div className="info-contenido">
      <h3>Abdomen abierto</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint fugit quaerat esse consequuntur repellendus eveniet exercitationem voluptate, reiciendis corrupti.</p>
      {imagen && imagen.marcadores.map(m => <p>{m.titulo}</p>)}

    </div>
  )
}

export default InfoContenido
