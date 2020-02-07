import React, { useEffect, useCallback, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MenuSeccion.css'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../../queries/seccion'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, fijarSubseccion, mostrarFormularioNuevaSeccion, esconderFormularioNuevaSeccion, agregarSubseccion } from '../../../redux/actions'
import agregarSubseccionMutation from '../../../mutations/agregarSubseccion'

const MenuSeccion = () => {

  const dispatch = useDispatch()
  const { mostrandoFormulario } = useSelector(state => state.seccion)
  const { id } = useParams()
  const { loading, error, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => dispatch(fijarSeccion(data.seccion))
  })
  const [mutation] = useMutation(agregarSubseccionMutation)
  const tituloNuevaSeccion = useRef()

  useEffect(() => {
    dispatch(fijarSubseccion(null))
    dispatch(esconderFormularioNuevaSeccion())
  }, [])

  useEffect(() => {
    if (mostrandoFormulario) {
      tituloNuevaSeccion.current.focus()
    }
  }, [mostrandoFormulario])

  const ListaSubsecciones = useCallback(() => loading ? null :
    <ul className="lista-items">
      {data.seccion.subsecciones
        .sort((s1, s2) => s1.nombre > s2.nombre ? 1 : -1)
        .map((subseccion, i) => (
          <li style={{ animationDelay: `${i * .05}s` }}>
            <Link
              key={subseccion.id}
              to={`/subseccion/${subseccion.id}`} key={subseccion.id}
              onClick={e => dispatch(fijarSubseccion(subseccion))}
            >
              {subseccion.nombre}
            </Link>
          </li>
      ))}
    </ul>, [data])

  const agregar = e => {
    e.preventDefault()
    const nombre = tituloNuevaSeccion.current.value
    if (nombre.length >= 3) {
      dispatch(esconderFormularioNuevaSeccion())
      mutation({
        variables: { seccion: id, nombre },
        refetchQueries: [{ query, variables: { id } }]
      })
    }
  }
  
  return (
    <div className="contenedor-lista">
      <ListaSubsecciones />
      {mostrandoFormulario &&
        <form onSubmit={agregar}>
          <input ref={tituloNuevaSeccion} type="text" />
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
