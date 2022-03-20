import React, { useState, useEffect, useRef } from 'react'
import './FormularioEdicionMarcador.css'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import editarMarcadorMutation from '../../../../mutations/editarMarcador'
import { editarMarcador, esconderEdicionMarcador } from '../../../../redux/actions'

const FormularioEdicionMarcador = () => {

  const { popup } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const nombreRef = useRef()
  const [editarMarcadorMutate] = useMutation(editarMarcadorMutation)
  const [titulo, setTitulo] = useState('')
  const { id } = popup

  useEffect(() => {
    nombreRef.current.focus()
    nombreRef.current.setSelectionRange(0, 2)
  }, [])

  const enviarEditarMarcador = e => {
    e.preventDefault()
    editarMarcadorMutate({ variables: { id, titulo } })
      .then(({ data }) => {
        dispatch(editarMarcador(data.editarMarcador))
        dispatch(esconderEdicionMarcador())
      })
  }

  return (
    <form
      onSubmit={enviarEditarMarcador}
      onClick={e => e.stopPropagation()}
      className="FormularioEdicionMarcador__formulario"
    >
      <input
        type="color"
        defaultValue="#D4001C"
      />
      <input
        type="text"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        ref={nombreRef}
        placeholder={popup?.titulo}
      />
      <input type="submit" value="Aceptar" />
    </form>
  )
}

export default FormularioEdicionMarcador
