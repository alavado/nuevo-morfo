import React, { useState } from 'react'
import './FormularioNuevaImagen.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioNuevaImagen } from '../../../redux/actions'
import mutation from '../../../mutations/agregarImagen'
import { useMutation } from '@apollo/react-hooks'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { isDev } from '../../../helpers/dev'
import query from '../../../queries/contenido'

const FormularioNuevaImagen = () => {

  const [envioBloqueado, setEnvioBloqueado] = useState(false)
  const { id } = useParams()
  const [imagen, setImagen] = useState(null)
  const dispatch = useDispatch()
  const [agregarImagenMutate] = useMutation(mutation)

  const agregarImagen = e => {
    e.preventDefault()
    if (envioBloqueado) {
      return
    }
    setEnvioBloqueado(true)
    let formData = new FormData()
    formData.append('imagen', imagen)
    axios.post(
      `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/subir_imagen`,
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
        //onUploadProgress: p => dispatch(fijarProgresoSubidaNuevoContenido(100 * p.loaded / imagen.size))
      }
    )
    .then(({ data: archivo }) => {
      agregarImagenMutate({
        variables: { contenido: id, archivo },
        refetchQueries: [{ query, variables: { id } }],
        awaitRefetchQueries: true
      })
      .then(() => window.location.reload())
    })
    .catch(err => {
      setEnvioBloqueado(false)
      console.error('Error subiendo imagen', err)
    })
  }

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioNuevaImagen())}
    >
      <div
        className="contenedor-formulario"
        id="formulario-nuevo-grupo"
        onClick={e => e.stopPropagation()}
      >
        <h3>Nueva imagen</h3>
        <form onSubmit={agregarImagen} autoComplete="new-password">
          <div>
            <label htmlFor="nueva-imagen-archivo">Archivo</label>
            <input onChange={e => setImagen(e.target.files[0])} id="imagen" type="file" />
          </div>
          <input type="submit" value="Agregar" disabled={envioBloqueado} />
          {envioBloqueado && <div>Subiendo...</div>}
        </form>
      </div>
    </div>
  )
}

export default FormularioNuevaImagen
