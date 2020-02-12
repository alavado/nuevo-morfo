import React, { useState, useEffect } from 'react'
import './FormularioEdicionMarcador.css'
import { useMutation } from '@apollo/react-hooks'
import { useSelector, useDispatch } from 'react-redux'
import editarMarcadorMutation from '../../../../mutations/editarMarcador'
import { editarMarcador, esconderEdicionMarcador } from '../../../../redux/actions'

const FormularioEdicionMarcador = () => {

  const { popup } = useSelector(state => state.contenido)
  const dispatch = useDispatch()
  const [editarMarcadorMutate] = useMutation(editarMarcadorMutation)
  const [titulo, setTitulo] = useState('')
  const { id } = popup

  useEffect(() => {
    if (popup) {
      setTitulo(popup.titulo)
    }
  }, [popup])

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
    >
      <input
        type="text"
        autoFocus
        value={titulo}
        onFocus={e => e.target.select()}
        onChange={e => setTitulo(e.target.value)}
      />
      <input type="submit" value="Aceptar" />
    </form>
  )
}

export default FormularioEdicionMarcador
