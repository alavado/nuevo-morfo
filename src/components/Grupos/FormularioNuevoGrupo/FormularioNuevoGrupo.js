import React, { useState } from 'react'
import './FormularioNuevoGrupo.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioNuevoGrupo } from '../../../redux/actions'
import query from '../../../queries/grupos'
import mutation from '../../../mutations/agregarGrupo'
import { useMutation } from '@apollo/react-hooks'

const FormularioNuevoGrupo = () => {

  const [variables, setVariables] = useState({
    nombre: '',
  })
  const dispatch = useDispatch()
  const [agregarGrupoMutate] = useMutation(mutation)

  const registrarNuevoGrupo = e => {
    e.preventDefault()
    agregarGrupoMutate({ variables, refetchQueries: [{ query }] })
      .then(() => dispatch(esconderFormularioNuevoGrupo()))
  }

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioNuevoGrupo())}
    >
      <div
        className="contenedor-formulario"
        id="formulario-nuevo-grupo"
        onClick={e => e.stopPropagation()}
      >
        <h3>Nuevo grupo</h3>
        <form onSubmit={registrarNuevoGrupo} autoComplete="new-password">
          <div>
            <label htmlFor="nuevo-grupo-nombre">Nombre</label>
            <input
              id="nuevo-grupo-nombre"
              type="text"
              spellCheck={false}
              autoFocus
              value={variables.nombre}
              onChange={e => setVariables({...variables, nombre: e.target.value})}
            />
          </div>
          <input type="submit" value="Registrar" />
        </form>
      </div>
    </div>
  )
}

export default FormularioNuevoGrupo
