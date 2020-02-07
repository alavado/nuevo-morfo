import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../queries/subseccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion, fijarSubseccion, fijarContenido } from '../../../redux/actions'
import './MenuSubseccion.css'

const MenuSubseccion = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const { loading, error, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => {
      dispatch(fijarSeccion(data.subseccion.seccion))
      dispatch(fijarSubseccion(data.subseccion))
    }
  })

  const listaContenidos = loading ? null :
    <ul className="lista-items">
      {data.subseccion.contenidos
        .sort((s1, s2) => s1.titulo > s2.titulo ? 1 : -1)
        .map((contenido, i) => (
          <Link
            to={`/contenido/${contenido.id}`}
            onClick={e => dispatch(fijarContenido(contenido))}
            key={contenido.id}
          >
            <li
              key={contenido.id}
              style={{ animationDelay: `${i * .05}s`, textDecoration: contenido.deleted ? 'line-through' : 'none' }}
            >
              {contenido.titulo}
            </li>
          </Link>
      ))}
    </ul>
  
  return listaContenidos
}

export default MenuSubseccion
