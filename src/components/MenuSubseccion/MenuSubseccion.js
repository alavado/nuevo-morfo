import React from 'react'
import './MenuSubseccion.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/subseccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion } from '../../redux/actions'

const MenuSubseccion = ({ match }) => {

  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => dispatch(fijarSeccion(data.subseccion.seccion))
  })

  const listaContenidos = loading ? null :
    <ul className="lista-contenidos">
      {data.subseccion.contenidos
        .sort((s1, s2) => s1.nombre > s2.nombre ? 1 : -1)
        .map(({ id, nombre }, i) => (
          <a href="#">
            <li
              key={id}
              style={{ animationDelay: `${i * .05}s` }}
            >
              {nombre}
            </li>
          </a>
      ))}
    </ul>
  
  return listaContenidos
}

export default MenuSubseccion
