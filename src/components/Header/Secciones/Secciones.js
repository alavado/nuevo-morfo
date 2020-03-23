import React from 'react'
import query from '../../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fijarSeccion } from '../../../redux/actions'
import './Secciones.css'

const Secciones = () => {

  const { seccion: seccionSeleccionada } = useSelector(state => state.navegacion)
  const { loading, data } = useQuery(query)
  const dispatch = useDispatch()

  return (
    <>
      {!loading && data && data.secciones.map((seccion, i) => (
        <Link
          key={seccion.id}
          to={`/seccion/${seccion.id}`}
          className={
            seccionSeleccionada &&
            seccionSeleccionada.id === seccion.id ?
            'seccion-activa' : ''
          }
          onClick={e => dispatch(fijarSeccion(seccion))}
          style={{ animationDelay: `${.15 * (data.secciones.length - i)}s` }}
        >
          {seccion.nombre}
        </Link>
      ))}
    </>
  )
}

export default Secciones
