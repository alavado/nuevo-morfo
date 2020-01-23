import React from 'react'
import { Link } from 'react-router-dom'
import './MenuSeccion.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../queries/seccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion } from '../../redux/actions'

const MenuSeccion = ({ match }) => {

  const dispatch = useDispatch()
  const { loading, error, data } = useQuery(query, {
    variables: {
      id: match.params.id
    },
    onCompleted: data => dispatch(fijarSeccion(data.seccion))
  })

  const listaSubsecciones = loading ? null :
    <ul className="lista-subsecciones">
      {data.seccion.subsecciones
        .sort((s1, s2) => s1.nombre > s2.nombre ? 1 : -1)
        .map(({ id, nombre }, i) => (
          <Link to={`/subseccion/${id}`} key={id}>
            <li style={{ animationDelay: `${i * .05}s` }}>
              {nombre}
            </li>
          </Link>
      ))}
    </ul>
  
  return listaSubsecciones
}

export default MenuSeccion
