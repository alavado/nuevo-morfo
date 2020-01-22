import React from 'react'
import { Route } from 'react-router-dom'
import './MenuSubsecciones.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/seccion'

const MenuSubsecciones = props => {

  const { loading, error, data } = useQuery(query, {
    variables: {
      id: props.match.params.id
    }
  })

  const subsecciones = loading ? null :
    <ul className="menu-subsecciones">
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
  
  return subsecciones
}

export default MenuSubsecciones
