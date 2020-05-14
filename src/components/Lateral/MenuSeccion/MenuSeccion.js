import React, { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import query from '../../../queries/seccion'
import { useDispatch, useSelector } from 'react-redux'
import { fijarSeccion, fijarSubseccion, mostrarFormularioNuevaSeccion, esconderFormularioNuevaSeccion } from '../../../redux/actions'
import agregarSubseccionMutation from '../../../mutations/agregarSubseccion'
import Loader from '../../Loader'
import useLateral from '../../../hooks/useLateral'
import ListaSubsecciones from './ListaSubsecciones'
import './MenuSeccion.css'

const MenuSeccion = () => {

  const dispatch = useDispatch()
  const { mostrandoFormulario } = useSelector(state => state.seccion)
  const { usuario } = useSelector(state => state.auth)
  const { id } = useParams()
  const { loading, data } = useQuery(query, {
    variables: { id },
    onCompleted: data => dispatch(fijarSeccion(data.seccion))
  })
  const [mutation] = useMutation(agregarSubseccionMutation)
  const tituloNuevaSubseccion = useRef()

  useLateral()

  useEffect(() => {
    dispatch(fijarSubseccion(null))
    dispatch(esconderFormularioNuevaSeccion())
    return () => dispatch(esconderFormularioNuevaSeccion())
  }, [dispatch])

  useEffect(() => {
    if (mostrandoFormulario) {
      tituloNuevaSubseccion.current.focus()
    }
  }, [mostrandoFormulario])

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
    <div className="MenuSeccion">
      <ListaSubsecciones data={data} />
      {mostrandoFormulario &&
        <form className="MenuSeccion__formulario_agregar_subseccion" onSubmit={agregar}>
          <input ref={tituloNuevaSubseccion} type="text" />
          <input type="submit" value="Agregar" />
        </form>
      }
      {!loading && !mostrandoFormulario && usuario &&
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
