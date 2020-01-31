import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { destacarMarcador, dejarDeDestacarMarcador } from '../../../redux/actions'
import './ListaEstructuras.css'

const ListaEstructuras = () => {

  const { imagen, marcadorDestacado } = useSelector(state => state.contenido)
  const dispatch = useDispatch()

  return (
    <div className="lista-estructuras">
      <h4>Estructuras</h4>
      <ul>
        {imagen.marcadores.map(marcador => (
          <li
            key={marcador.id}
            onMouseEnter={() => dispatch(destacarMarcador(marcador))}
            onMouseLeave={() => dispatch(dejarDeDestacarMarcador())}
          >
            <a className={marcadorDestacado && marcadorDestacado.id === marcador.id ? 'nombre-estructura-seleccionada' : ''}>{marcador.titulo} - {marcador.id}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaEstructuras
