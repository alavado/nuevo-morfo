import React, { useEffect, useState } from 'react'
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
import PopupEliminar from './PopupEliminar'
import TIPOS from '../../../config/tiposContenidos'

const InfoContenido = () => {

  const [eliminando, setEliminando] = useState(false)
  const { contenido } = useSelector(state => state.contenido)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [eliminar] = useMutation(eliminarMutation)
  const [restaurar] = useMutation(restaurarMutation)
  const history = useHistory()

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [dispatch])

  if (!contenido || !contenido.imagenes || !contenido.imagenes[0].id) {
    return <Loader />
  }

  const BotonCambiarEstado = () => {
    const { id } = contenido
    const mutacion = contenido.deleted ? restaurar : eliminar
    const texto = contenido.deleted ? 'Restaurar' : 'Eliminar'

    const eliminarEstructura = () => {
      eliminar({
        variables: { id },
        refetchQueries: [{
          query,
          variables: { id }
        }],
        awaitRefetchQueries: true
      })
      .then(() => history.push(`/subseccion/${contenido.subseccion.id}`))
    }

    return (eliminando ?
      <PopupEliminar
        cancelar={() => setEliminando(false)}
        eliminar={eliminarEstructura}
      /> :
      <button
        className="boton-eliminar"
        onClick={() => setEliminando(true)}
      >
        {texto}
      </button>
    )
  }

  return (
    <div className="InfoContenido">
      <h3 className="InfoContenido__titulo">{contenido.titulo}</h3>
      {usuario && esAdmin(usuario) &&
        <div className="InfoContenido__contenedor_grupos">
          {contenido.grupos.map(grupo => (
            <div
              key={grupo.id}
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
      {(esAdmin(usuario) || !contenido.tipo || contenido.tipo === TIPOS[0].id) && <Miniaturas />}
      <ListaEstructuras />
      {usuario && esAdmin(usuario) && <BotonCambiarEstado />}
    </div>
  )
}

export default InfoContenido
