import React, { useState, useRef, useEffect } from 'react'
import './FormularioGruposUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioGruposUsuario, agregarNuevoUsuario } from '../../../redux/actions'
import actualizarUsuarioMutation from '../../../mutations/agregarUsuario'
import query from '../../../queries/grupos'
import { useMutation, useQuery } from '@apollo/react-hooks'
import MiLoader from '../../Loader'
import { compararPropiedadString } from '../../../helpers/utiles'

const FormularioGruposUsuario = ({ usuario }) => {

  const dispatch = useDispatch()
  const [actualizarUsuarioMutate] = useMutation(actualizarUsuarioMutation)
  const { loading, error, data } = useQuery(query)

  const actualizarGrupos = e => {
    e.preventDefault()
  }

  useEffect(() => () => dispatch(esconderFormularioGruposUsuario()))

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioGruposUsuario())}
    >
      <div
        className="contenedor-formulario"
        onClick={e => e.stopPropagation()}
      >
        <h3>Grupos a los que pertenece<br />{usuario.nombre}</h3>
        {loading ? <MiLoader /> :
          <form onSubmit={actualizarGrupos} className="contenedor-checkboxes">
            {data.grupos.sort(compararPropiedadString('nombre')).map(grupo => (
              <label key={`label-${grupo.id}`}>
                <input type="checkbox" onChange={e => actualizarGrupos(e, grupo.id)} />
                <span style={{ backgroundColor: grupo.color }}>{grupo.nombre}</span>
              </label>
            ))}
            <input type="submit" value="Actualizar grupos" />
          </form>
        }
      </div>
    </div>
  )
}

export default FormularioGruposUsuario
