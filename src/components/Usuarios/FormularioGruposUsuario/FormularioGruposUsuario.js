import React, { useState, useRef } from 'react'
import './FormularioGruposUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioGruposUsuario, agregarNuevoUsuario } from '../../../redux/actions'
import mutation from '../../../mutations/agregarUsuario'
import query from '../../../queries/grupos'
import { useMutation, useQuery } from '@apollo/react-hooks'
import MiLoader from '../../Loader'
import { compararPropiedadString } from '../../../helpers/utiles'

const FormularioGruposUsuario = ({ usuario }) => {

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
        onClick={e => e.stopPropagation()}
      >
        <h3>Grupos a los que pertenece<br />{usuario.nombre}</h3>
        {loading ? <MiLoader /> :
          <div className="contenedor-checkboxes">
            {data.grupos.sort(compararPropiedadString('nombre')).map(grupo => (
              <label>
                <input type="checkbox" />
                <span style={{ backgroundColor: grupo.color }}>{grupo.nombre}</span>
              </label>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default FormularioGruposUsuario
