import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import query from '../../../queries/subseccion'
import { useSelector, useDispatch } from 'react-redux'
import { fijarSeccion, fijarSubseccion, fijarContenido } from '../../../redux/actions'
import './MenuSubseccion.css'
import Loader from '../../Loader'
import _ from 'lodash'
import useLateral from '../../../hooks/useLateral'
import { compararPropiedadString } from '../../../helpers/utiles'
import { esAdmin } from '../../../helpers/auth'

const MenuSubseccion = () => {

  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.auth)
  const { id } = useParams()
  const { loading, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => {
      dispatch(fijarSeccion(data.subseccion.seccion))
      dispatch(fijarSubseccion(data.subseccion))
    }
  })
  useLateral()

  const ListaContenidos = () => loading ? <Loader /> :
    (_.isEmpty(data.subseccion.contenidos) ?
      <p className="mensaje-lista-vacia">No hay contenidos</p> :
      <ul className="lista-items">
        {data.subseccion.contenidos
          .sort(compararPropiedadString('titulo'))
          .filter(c => !c.deleted)
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
      </ul>)
  
  return (
    <div className="contenedor-lista">
      <ListaContenidos />
      {!loading && usuario && esAdmin(usuario) &&
        <Link to={`/contenido/nuevo/${id}`} className="boton-agregar">
          Agregar contenido
        </Link>
      }
    </div>
  )
}

export default MenuSubseccion
