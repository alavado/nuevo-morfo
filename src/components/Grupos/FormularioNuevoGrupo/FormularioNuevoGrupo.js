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
    color: '#ff00ff'
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
          <div>
            <label htmlFor="nuevo-grupo-color">Color</label>
            <input
              id="nuevo-grupo-color"
              type="text"
              spellCheck={false}
              autoFocus
              value={variables.color}
              onChange={e => setVariables({...variables, color: e.target.value})}
            />
          </div>
          <input className="FormularioNuevoGrupo__boton" type="submit" disabled={variables.nombre.length < 4 || !(/^#[0-9A-F]{6}$/i.test(variables.color))} value="Registrar" />
        </form>
      </div>
    </div>
  )
}

export default FormularioNuevoGrupo
