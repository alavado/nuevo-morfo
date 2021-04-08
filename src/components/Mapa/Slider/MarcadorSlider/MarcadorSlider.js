import { useMutation } from '@apollo/react-hooks'
import './MarcadorSlider.css'
import editarMarcadorMutation from '../../../../mutations/editarMarcador'
import { useDispatch } from 'react-redux'
import { editarMarcador, esconderEdicionMarcador } from '../../../../redux/actions'
import { useState } from 'react'

const MarcadorSlider = ({ marcador }) => {

  const [editarMarcadorMutate] = useMutation(editarMarcadorMutation)
  const [editando, setEditando] = useState(false)
  const [tituloMarcador, setTituloMarcador] = useState('')
  const dispatch = useDispatch()

  const enviarEditarMarcador = e => {
    e.preventDefault()
    editarMarcadorMutate({ variables: { id: marcador.id, titulo: tituloMarcador } })
      .then(({ data }) => {
        setTituloMarcador('')
        setEditando(false)
        dispatch(editarMarcador(data.editarMarcador))
        dispatch(esconderEdicionMarcador())
      })
  }

  return (
    <div
      className="MarcadorSlider"
      style={{ left: `${marcador.lng}%`, top: `${marcador.lat}%` }}
    >
      {editando 
        ? <div className="MarcadorSlider__formulario_nombre">
            <form onSubmit={enviarEditarMarcador}>
              <input
                autoFocus
                defaultValue={marcador.titulo}
                onChange={e => setTituloMarcador(e.target.value)}
              />
            </form>
            <button
              className="MarcadorSlider__boton_cerrar_formulario"
              onClick={() => setEditando(false)}
            >
              x
            </button>
          </div>
        : <div
            className="MarcadorSlider__etiqueta"
            onClick={() => setEditando(true)}
          >
            {marcador.titulo}
          </div>
      }
    </div>
  )
}

export default MarcadorSlider
