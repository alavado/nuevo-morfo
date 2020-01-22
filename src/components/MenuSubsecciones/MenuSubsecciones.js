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
    <ul>
      {data.seccion.subsecciones.map(({ id, nombre }) => (
        <li key={id}>
          {nombre}
        </li>
      ))}
    </ul>
  
  return subsecciones
}

export default MenuSubsecciones
