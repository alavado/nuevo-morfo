import React, { useState } from 'react'
import agregarSubseccionMutation from '../../../../mutations/agregarSubseccion'
import { useMutation } from '@apollo/react-hooks'
import query from '../../../../queries/subseccion'
import './FormularioNuevaSubseccion.css'

const FormularioNuevaSubseccion = ({ idSeccion, idSubseccion }) => {

  const [mutation] = useMutation(agregarSubseccionMutation)
  const [nombreNuevaSubseccion, setNombreNuevaSubseccion] = useState('x')

  const agregarSubseccion = e => {
    e.preventDefault()
    if (nombreNuevaSubseccion.length < 3) {
      return
    }
    mutation({
      variables: {
        seccion: idSeccion,
        nombre: nombreNuevaSubseccion,
        subseccion: idSubseccion
      },
      refetchQueries: [{ query, variables: { id: idSubseccion } }]
    })
  }

  return (
    <form onSubmit={agregarSubseccion} className="FormularioNuevaSubseccion">
      <input
        className="FormularioNuevaSubseccion__input"
        type="text"
        onChange={e => setNombreNuevaSubseccion(e.target.value)}
      />
      <button
        type="submit"
        className="boton-agregar"
      >
        Agregar subseccion
      </button>
    </form>
  )
}

export default FormularioNuevaSubseccion
