import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { destacarMarcador, dejarDeDestacarMarcador } from '../../../redux/actions'
import './ListaEstructuras.css'

const ListaEstructuras = () => {

  const { imagen } = useSelector(state => state.contenido)
  const dispatch = useDispatch()

  return (
    <div className="lista-estructuras">
      <h4>Estructuras</h4>
      <ul>
        {imagen.marcadores.map((marcador, i) => (
          <li
            key={marcador.id}
            style={{ animationDelay: `${i * .15}s` }}
            onMouseEnter={() => dispatch(destacarMarcador(marcador))}
            onMouseLeave={() => dispatch(dejarDeDestacarMarcador())}
          >
            <a className="nombre-estructura">{marcador.titulo} - {marcador.id}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListaEstructuras
