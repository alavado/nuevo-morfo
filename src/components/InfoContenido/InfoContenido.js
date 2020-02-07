import React from 'react'
import './InfoContenido.css'
import { useSelector } from 'react-redux'
import ListaEstructuras from './ListaEstructuras/ListaEstructuras'
import Miniaturas from './Miniaturas'
import { useMutation } from '@apollo/react-hooks'
import query from '../../queries/contenido'
import eliminarMutation from '../../mutations/eliminarContenido'
import restaurarMutation from '../../mutations/restaurarContenido'
import { useHistory } from 'react-router-dom'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)
  const [eliminar] = useMutation(eliminarMutation)
  const [restaurar] = useMutation(restaurarMutation)
  const history = useHistory()

  if (!contenido || !imagen) {
    return 'cargando...'
  }

  const BotonCambiarEstado = () => {
    const { id } = contenido
    const mutacion = contenido.deleted ? restaurar : eliminar
    const texto = contenido.deleted ? 'Restaurar' : 'Eliminar'
    return <button onClick={() => mutacion({
      variables: { id },
      refetchQueries: [{
        query,
        variables: { id }
      }],
      awaitRefetchQueries: true
    }).then(() => history.push(`/subseccion/${contenido.subseccion.id}`))}>{texto}</button>
  }

  return (
    <div className="info-contenido">
      <h3>{contenido.titulo}</h3>
      <p>{contenido.descripcion}</p>
      <Miniaturas />
      <ListaEstructuras />
      <BotonCambiarEstado />
    </div>
  )
}

export default InfoContenido
