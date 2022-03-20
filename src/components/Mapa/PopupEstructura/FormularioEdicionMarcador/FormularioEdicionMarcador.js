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
  const [titulo, setTitulo] = useState(popup?.titulo || '')
  const [color, setColor] = useState('#FF0000')
  const [enviando, setEnviando] = useState(false)
  const { id } = popup

  useEffect(() => {
    nombreRef.current.focus()
    nombreRef.current.setSelectionRange(0, 200)
  }, [])

  const enviarEditarMarcador = e => {
    e.preventDefault()
    setEnviando(true)
    editarMarcadorMutate({ variables: { id, titulo, color } })
      .then(({ data }) => {
        setEnviando(false)
        dispatch(editarMarcador(data.editarMarcador))
        dispatch(esconderEdicionMarcador())
      })
      .catch(err => setEnviando(false))
  }

  return (
    <form
      onSubmit={enviarEditarMarcador}
      onClick={e => e.stopPropagation()}
      className="FormularioEdicionMarcador__formulario"
    >
      <input
        type="color"
        value={color}
        onChange={e => setColor(e.target.value)}
      />
      <input
        type="text"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        ref={nombreRef}
        placeholder={popup?.titulo}
      />
      <input
        type="submit"
        value="Aceptar"
        disabled={enviando}
      />
    </form>
  )
}

export default FormularioEdicionMarcador
