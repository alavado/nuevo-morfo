import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../queries/subseccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion, fijarSubseccion, fijarContenido, mostrarNavegacion } from '../../../redux/actions'
import './MenuSubseccion.css'
import Loader from '../../Loader'

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

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [])

  const ListaContenidos = () => loading ? null :
    <ul className="lista-items">
      {data.subseccion.contenidos
        .sort((s1, s2) => s1.titulo > s2.titulo ? 1 : -1)
        .map((contenido, i) => (
          <li
            key={contenido.id}
            style={{
              animationDelay: `${i * .05}s`,
              textDecoration: contenido.deleted ? 'line-through' : 'none'
            }}
          >
            <Link
              to={`/contenido/${contenido.id}`}
              onClick={e => dispatch(fijarContenido(contenido))}
              key={contenido.id}
            >
              {contenido.titulo}
            </Link>
          </li>
      ))}
    </ul>

  if (loading) {
    return <Loader />
  }
  
  return (
    <div className="contenedor-lista">
      <ListaContenidos />
      {!loading && <button className="boton-agregar">Agregar contenido</button>}
    </div>
  )
}

export default MenuSubseccion
