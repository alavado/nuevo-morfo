import React from 'react'
import './MenuSubseccion.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/subseccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion, fijarSubseccion } from '../../redux/actions'

const MenuSubseccion = ({ match }) => {

  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => {
      dispatch(fijarSeccion(data.subseccion.seccion))
      dispatch(fijarSubseccion(data.subseccion))
    }
  })

  const listaContenidos = loading ? null :
    <ul className="lista-contenidos">
      {data.subseccion.contenidos
        .sort((s1, s2) => s1.titulo > s2.titulo ? 1 : -1)
        .map(({ id, titulo }, i) => (
          <a href="#" key={id}>
            <li
              key={id}
              style={{ animationDelay: `${i * .05}s` }}
            >
              {titulo}
            </li>
          </a>
      ))}
    </ul>
  
  return listaContenidos
}

export default MenuSubseccion
