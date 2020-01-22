import React from 'react'
import { Route } from 'react-router-dom'
import './MenuSeccion.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/seccion'

const MenuSeccion = ({ match }) => {

  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    }
  })

  const listaSubsecciones = loading ? null :
    <ul className="lista-subsecciones">
      {data.seccion.subsecciones
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
  
  return listaSubsecciones
}

export default MenuSeccion
