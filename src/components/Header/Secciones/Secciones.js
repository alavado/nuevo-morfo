import React from 'react'
import query from '../../../queries/secciones'
import { useQuery } from '@apollo/react-hooks'
import { NavLink as Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fijarSeccion, mostrarAdministracion } from '../../../redux/actions'
import './Secciones.css'
import { esAdmin } from '../../../helpers/auth'

const Secciones = () => {

  const { mostrandoAdministracion } = useSelector(state => state.navegacion)
  const { usuario } = useSelector(state => state.auth)
  const { loading, data } = useQuery(query)
  const dispatch = useDispatch()

  return (
    <div className="Secciones">
      {usuario && esAdmin(usuario) && <Link
        to="/admin"
        activeClassName="Secciones__link_navegacion--activo"
        className="Secciones__link_navegacion"
        onClick={() => {
          dispatch(mostrarAdministracion())
          dispatch(fijarSeccion(null))
        }}
      >
        Administración
      </Link>}
      {!loading && data && data.secciones.map((seccion, i) => (
        <Link
          key={seccion.id}
          to={`/seccion/${seccion.id}`}
          activeClassName="Secciones__link_navegacion--activo"
          className="Secciones__link_navegacion"
          onClick={e => dispatch(fijarSeccion(seccion))}
          style={{ animationDelay: `${.15 * (data.secciones.length - i)}s` }}
        >
          {seccion.nombre}
        </Link>
      ))}
    </div>
  )
}

export default Secciones
