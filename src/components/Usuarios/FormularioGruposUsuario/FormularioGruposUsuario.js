import React, { useState, useRef } from 'react'
import './FormularioGruposUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioGruposUsuario, agregarNuevoUsuario } from '../../../redux/actions'
import mutation from '../../../mutations/agregarUsuario'
import query from '../../../queries/grupos'
import { useMutation, useQuery } from '@apollo/react-hooks'
import MiLoader from '../../Loader'

const FormularioGruposUsuario = () => {

  const [variables, setVariables] = useState({
    nombre: '',
    email: '',
    password: ''
  })
  const dispatch = useDispatch()
  const [agregarUsuarioMutate] = useMutation(mutation)
  const { loading, error, data } = useQuery(query)

  const actualizarGrupos = e => {
    e.preventDefault()
  }

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioGruposUsuario())}
    >
      <div
        className="contenedor-formulario"
        id="formulario-nuevo-usuario"
        onClick={e => e.stopPropagation()}
      >
        <h3>Nuevo usuario</h3>
        {loading ? <MiLoader /> :
          <form onSubmit={actualizarGrupos} autoComplete="new-password">
            <input type="submit" value="Registrar" />
          </form>
        }
      </div>
    </div>
  )
}

export default FormularioGruposUsuario
