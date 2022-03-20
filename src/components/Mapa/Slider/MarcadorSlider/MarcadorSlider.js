import { useMutation } from '@apollo/react-hooks'
import './MarcadorSlider.css'
import editarMarcadorMutation from '../../../../mutations/editarMarcador'
import { useDispatch, useSelector } from 'react-redux'
import { editarMarcador, eliminarMarcadorDeImagenActual, esconderEdicionMarcador, esconderPopup } from '../../../../redux/actions'
import { useState } from 'react'
import eliminarMarcadorMutation from '../../../../mutations/eliminarMarcador'
import { faTrashAlt as iconoEliminar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { esAdmin } from '../../../../helpers/auth'

const MarcadorSlider = ({ marcador }) => {

  const [editarMarcadorMutate] = useMutation(editarMarcadorMutation)
  const [editando, setEditando] = useState(false)
  const [tituloMarcador, setTituloMarcador] = useState(marcador.titulo)
  const [colorMarcador, setColorMarcador] = useState(marcador.color || '#FF0000')
  const [eliminarMarcadorMutate] = useMutation(eliminarMarcadorMutation)
  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.auth)

  const enviarEditarMarcador = e => {
    e.preventDefault()
    if (!esAdmin(usuario)) {
      return
    }
    editarMarcadorMutate({ variables: { id: marcador.id, titulo: tituloMarcador, color: colorMarcador } })
      .then(({ data }) => {
        setTituloMarcador('')
        setEditando(false)
        dispatch(editarMarcador(data.editarMarcador))
        dispatch(esconderEdicionMarcador())
      })
  }

  const eliminarMarcador = e => {
    e.stopPropagation()
    setEditando(false)
    dispatch(eliminarMarcadorDeImagenActual(marcador.id))
    dispatch(esconderPopup())
    eliminarMarcadorMutate({ variables: { id: marcador.id } })
  }

  return (
    <div
      className="MarcadorSlider"
      style={{
        left: `${marcador.lng}%`,
        top: `${marcador.lat}%`,
        background: `${marcador.color || 'red'}`
      }}
      onClick={() => esAdmin(usuario) && setEditando(true)}
    >
      {editando 
        ? <div className="MarcadorSlider__formulario_nombre">
            <form className="MarcadorSlider__formulario" onSubmit={enviarEditarMarcador}>
              <input
                type="color"
                value={colorMarcador}
                onChange={e => setColorMarcador(e.target.value)}
              />
              <input
                autoFocus
                value={tituloMarcador}
                onChange={e => setTituloMarcador(e.target.value)}
              />
            </form>
            <button
              className="MarcadorSlider__boton_cerrar_formulario"
              onClick={e => {
                e.stopPropagation()
                setEditando(false)
              }}
              title="Cancelar"
            >
              x
            </button>
            {esAdmin(usuario) && <button title="Eliminar marcador" onClick={eliminarMarcador}>
              <FontAwesomeIcon icon={iconoEliminar} size="sm" />
            </button>}
          </div>
        : <div
            className="MarcadorSlider__etiqueta"
            onClick={() => esAdmin(usuario) && setEditando(true)}
          >
            {marcador.titulo}
          </div>
      }
    </div>
  )
}

export default MarcadorSlider
