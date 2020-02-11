import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { destacarMarcador, dejarDeDestacarMarcador, mostrarPopup, esconderPopup, fijarDestino } from '../../../redux/actions'
import './ListaEstructuras.css'
import _ from 'lodash'
import { compararPropiedadString } from '../../../helpers/utiles'

const ListaEstructuras = () => {

  const { contenido, indiceImagenActual } = useSelector(state => state.contenido)
  const [estructuraClickeada, setEstructuraClickeada] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="lista-estructuras">
      <h4>Estructuras</h4>
      {_.isEmpty(contenido.imagenes[indiceImagenActual].marcadores) ?
        <>
          <p className="mensaje-lista-vacia">No hay estructuras en esta imagen.</p>
          <p className="mensaje-lista-vacia">Recuerda que puedes agregar estructuras haciendo click derecho sobre la imagen</p>
        </> : 
        <ul>
          {contenido.imagenes[indiceImagenActual].marcadores
            .sort(compararPropiedadString('titulo'))
            .map((marcador, i) => (
              <li
                key={marcador.id}
                style={{ animationDelay: `${i * .05}s` }}
                onMouseEnter={() => {
                  dispatch(destacarMarcador(marcador))
                  dispatch(mostrarPopup(marcador))
                }}
                onClick={() => {
                  setEstructuraClickeada(true)
                  dispatch(fijarDestino({ lat: marcador.lat, lng: marcador.lng }))
                }}
                onMouseLeave={() => {
                  dispatch(dejarDeDestacarMarcador())
                  if (!estructuraClickeada) {
                    dispatch(esconderPopup())
                  }
                  setEstructuraClickeada(false)
                }}
              >
                <a className="nombre-estructura">{marcador.titulo}</a>
              </li>
          ))}
        </ul>
      } 
    </div>
  )
}

export default ListaEstructuras
