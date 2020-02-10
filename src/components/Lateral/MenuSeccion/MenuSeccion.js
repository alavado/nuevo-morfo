import React, { useEffect, useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MenuSeccion.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../../queries/seccion'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, fijarSubseccion, mostrarFormularioNuevaSeccion, esconderFormularioNuevaSeccion, agregarSubseccion, mostrarNavegacion } from '../../../redux/actions'
import agregarSubseccionMutation from '../../../mutations/agregarSubseccion'
import eliminarSubseccionMutation from '../../../mutations/eliminarSubseccion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import Loader from '../../Loader'
import useLateral from '../../../hooks/useLateral'
import _ from 'lodash'

const MenuSeccion = () => {

  const dispatch = useDispatch()
  const { mostrandoFormulario } = useSelector(state => state.seccion)
  const { id } = useParams()
  const { loading, error, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => dispatch(fijarSeccion(data.seccion))
  })
  const [mutation] = useMutation(agregarSubseccionMutation)
  const [eliminarMutation] = useMutation(eliminarSubseccionMutation)
  const tituloNuevaSubseccion = useRef()

  useLateral()

  useEffect(() => {
    dispatch(fijarSubseccion(null))
    dispatch(esconderFormularioNuevaSeccion())
  }, [])

  useEffect(() => {
    if (mostrandoFormulario) {
      tituloNuevaSubseccion.current.focus()
    }
  }, [mostrandoFormulario])

  const ListaSubsecciones = useCallback(() => loading ? null :
    <ul className="lista-items">
      {data.seccion.subsecciones
        .sort((s1, s2) => s1.nombre.toLocaleUpperCase() > s2.nombre.toLocaleUpperCase() ? 1 : -1)
        .map((subseccion, i) => (
          <li
            key={subseccion.id}
            style={{ animationDelay: `${i * .05}s` }}
          >
            <Link
              to={`/subseccion/${subseccion.id}`} key={subseccion.id}
              onClick={e => dispatch(fijarSubseccion(subseccion))}
            >
              {subseccion.nombre}
            </Link>
            {_.isEmpty(subseccion.contenidos.filter(c => !c.deleted)) &&
              <button
                className="boton-eliminar-subseccion"
                onClick={() => eliminar(subseccion.id)}
                title={`Eliminar subsección "${subseccion.nombre}"`}
              >
                <FontAwesomeIcon icon={iconoEliminar} />
              </button>
            }
          </li>
      ))}
    </ul>, [data, dispatch, loading])

  const eliminar = idSubseccion => {
    eliminarMutation({
      variables: { id: idSubseccion },
      refetchQueries: [{ query, variables: { id } }]
    })
  }

  const agregar = e => {
    e.preventDefault()
    const nombre = tituloNuevaSubseccion.current.value
    if (nombre.length >= 3) {
      dispatch(esconderFormularioNuevaSeccion())
      mutation({
        variables: { seccion: id, nombre },
        refetchQueries: [{ query, variables: { id } }]
      })
    }
  }

  if (loading) {
    return <Loader />
  }
  
  return (
    <div className="contenedor-lista">
      <ListaSubsecciones />
      {mostrandoFormulario &&
        <form className="formulario-agregar-subseccion" onSubmit={agregar}>
          <input ref={tituloNuevaSubseccion} type="text" />
          <input type="submit" value="Agregar" />
        </form>
      }
      {!loading && !mostrandoFormulario &&
        <button
          className="boton-agregar"
          onClick={() => dispatch(mostrarFormularioNuevaSeccion())}
        >
          Agregar subsección
        </button>
      }
    </div>
  )
}

export default MenuSeccion
