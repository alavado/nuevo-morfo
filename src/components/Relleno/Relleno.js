import React from 'react'
import './Relleno.css'
import { useSelector } from 'react-redux'

const Relleno = () => {

  const { nuevoContenido } = useSelector(state => state.contenido)

  return (
    <div className="relleno-stripes">
      {nuevoContenido.subiendo &&
        <div className="mensaje">
          <p>Agregando contenido...</p>
          <div className="barra-progreso">
            <div className="progreso" style={{ width: `${nuevoContenido.progreso}%` }}></div>
          </div>
        </div>
      }
    </div>
  )
}

export default Relleno
