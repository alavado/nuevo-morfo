import React, { useState } from 'react'
import axios from 'axios'
import './NuevoContenido.css'
import useLateral from '../../../hooks/useLateral'
import { isDev } from '../../../helpers/dev'
import { useMutation } from '@apollo/react-hooks'
import agregarContenidoMutation from '../../../mutations/agregarContenido'
import agregarImagenMutation from '../../../mutations/agregarImagen'
import query from '../../../queries/subseccion'
import { useHistory, useParams } from 'react-router-dom'

const NuevoContenido = () => {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [imagen, setImagen] = useState(null)
  const [agregarContenido] = useMutation(agregarContenidoMutation)
  const [agregarImagen] = useMutation(agregarImagenMutation)
  const { subseccion } = useParams()
  const history = useHistory()

  useLateral()

  const enviarFormulario = e => {
    e.preventDefault()
    let contenido = ''
    agregarContenido({ variables: { titulo, descripcion, subseccion } })
      .then(({ data }) => {
        contenido = data.agregarContenido.id
        let formData = new FormData()
        formData.append('imagen', imagen)
        return axios.post(
          `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/subir_imagen`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        )
      })
      .then(({ data: archivo }) => agregarImagen({
        variables: { contenido, archivo },
        refetchQueries: [{ query, variables: { id: subseccion } }],
        awaitRefetchQueries: true
      }))
      .then(() => history.push(`/contenido/${contenido}`))
      .catch(err => console.error('Error subiendo imagen', err))
  }

  return (
    <div className="contenedor-formulario-lateral">
      <h2>Nuevo contenido</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input onChange={e => setTitulo(e.target.value)} id="titulo" type="text" />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea onChange={e => setDescripcion(e.target.value)} id="descripcion"></textarea>
        </div>
        <div>
          <label htmlFor="imagen">Imagen</label>
          <input onChange={e => setImagen(e.target.files[0])} id="imagen" type="file" />
        </div>
        <input type="submit" value="Agregar" className="boton-agregar" disabled={titulo.length < 3 || !imagen} />
      </form>
    </div>
  )
}

export default NuevoContenido
