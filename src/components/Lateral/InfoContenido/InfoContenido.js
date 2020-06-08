import React, { useEffect } from 'react'
import './InfoContenido.css'
import { useSelector, useDispatch } from 'react-redux'
import ListaEstructuras from './ListaEstructuras/ListaEstructuras'
import Miniaturas from './Miniaturas'
import { useMutation } from '@apollo/react-hooks'
import query from '../../../queries/contenido'
import eliminarMutation from '../../../mutations/eliminarContenido'
import restaurarMutation from '../../../mutations/restaurarContenido'
import { useHistory } from 'react-router-dom'
import Loader from '../../Loader'
import { mostrarNavegacion } from '../../../redux/actions'
import { esAdmin } from '../../../helpers/auth'

const InfoContenido = () => {

  const { contenido } = useSelector(state => state.contenido)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [eliminar] = useMutation(eliminarMutation)
  const [restaurar] = useMutation(restaurarMutation)
  const history = useHistory()

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [dispatch])

  if (!contenido || !contenido.imagenes) {
    return <Loader />
  }

  const BotonCambiarEstado = () => {
    const { id } = contenido
    const mutacion = contenido.deleted ? restaurar : eliminar
    const texto = contenido.deleted ? 'Restaurar' : 'Deshabilitar'
    return (
      <button
        className="boton-eliminar"
        onClick={() => (
          mutacion({
            variables: { id },
            refetchQueries: [{
              query,
              variables: { id }
            }],
            awaitRefetchQueries: true
          })).then(() => history.push(`/subseccion/${contenido.subseccion.id}`))
        }
      >
        {texto}
      </button>
    )
  }

  console.log(contenido)

  return (
    <div className="InfoContenido">
      <h3 className="InfoContenido__titulo">{contenido.titulo}</h3>
      {usuario && esAdmin(usuario) &&
        <div className="InfoContenido__contenedor_grupos">
          {contenido.grupos.map(grupo => (
            <div
              className="InfoContenido__grupo"
              style={{ backgroundColor: grupo.color }}
              title={`Este contenido está disponible para ${grupo.nombre}`}
            >
              {grupo.nombre}
            </div>
          ))}
        </div>
      }
      <p className="InfoContenido__descripcion">{contenido.descripcion}</p>
      <Miniaturas />
      <ListaEstructuras />
      {usuario && esAdmin(usuario) && <BotonCambiarEstado />}
    </div>
  )
}

export default InfoContenido
