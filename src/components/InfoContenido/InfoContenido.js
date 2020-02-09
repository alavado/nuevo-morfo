import React, { useEffect } from 'react'
import './InfoContenido.css'
import { useSelector, useDispatch } from 'react-redux'
import ListaEstructuras from './ListaEstructuras/ListaEstructuras'
import Miniaturas from './Miniaturas'
import { useMutation } from '@apollo/react-hooks'
import query from '../../queries/contenido'
import eliminarMutation from '../../mutations/eliminarContenido'
import restaurarMutation from '../../mutations/restaurarContenido'
import { useHistory } from 'react-router-dom'
import Loader from '../Loader'
import { mostrarNavegacion } from '../../redux/actions'

const InfoContenido = () => {

  const { contenido, imagen } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [eliminar] = useMutation(eliminarMutation)
  const [restaurar] = useMutation(restaurarMutation)
  const history = useHistory()

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [])

  if (!contenido || !imagen) {
    return <Loader />
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
