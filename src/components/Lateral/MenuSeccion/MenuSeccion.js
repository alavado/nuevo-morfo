import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MenuSeccion.css'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../queries/seccion'
import { useDispatch } from 'react-redux'
import { fijarSeccion, fijarSubseccion } from '../../../redux/actions'

const MenuSeccion = () => {

  const dispatch = useDispatch()
  const { id } = useParams()
  const { loading, error, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => dispatch(fijarSeccion(data.seccion))
  })

  useEffect(() => {
    dispatch(fijarSubseccion(null))
  }, [])

  const ListaSubsecciones = () => loading ? null :
    <ul className="lista-items">
      {data.seccion.subsecciones
        .sort((s1, s2) => s1.nombre > s2.nombre ? 1 : -1)
        .map((subseccion, i) => (
          <Link
            key={subseccion.id}
            to={`/subseccion/${subseccion.id}`} key={subseccion.id}
            onClick={e => dispatch(fijarSubseccion(subseccion))}
          >
            <li style={{ animationDelay: `${i * .05}s` }}>
              {subseccion.nombre}
            </li>
          </Link>
      ))}
    </ul>
  
  return (
    <div className="contenedor-lista">
      <ListaSubsecciones />
      {!loading && <button className="boton-agregar">Agregar subsección</button>}
    </div>
  )
}

export default MenuSeccion
