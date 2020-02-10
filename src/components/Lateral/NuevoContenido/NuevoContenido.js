import React, { useRef } from 'react'
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

  const titulo = useRef()
  const descripcion = useRef()
  const imagen = useRef()
  const [agregarContenido] = useMutation(agregarContenidoMutation)
  const [agregarImagen] = useMutation(agregarImagenMutation)
  const { subseccion } = useParams()
  const history = useHistory()

  useLateral()

  const enviarFormulario = e => {
    e.preventDefault()

    //HAY QUE BLOQUEAR EL BOTON
    let contenido = ''
    agregarContenido({
      variables: {
        titulo: titulo.current.value,
        descripcion: descripcion.current.value,
        subseccion
      }
    })
    .then(({ data }) => {
      contenido = data.agregarContenido.id
      let formData = new FormData()
      formData.append('imagen', imagen.current.files[0])
      return axios.post(
        `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/subir_imagen`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )
    })
    .then(({ data: archivo }) => agregarImagen({
      variables: { contenido, archivo, descripcion: '' },
      refetchQueries: [{ query, variables: { id: subseccion } }],
      awaitRefetchQueries: true
    }))
    .then(() => history.push(`/contenido/${contenido}`))
    .catch(err => console.log('FAILURE!!', err))
  }

  return (
    <div className="contenedor-formulario-lateral">
      <h2>Nuevo contenido</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label htmlFor="titulo">Título</label>
          <input ref={titulo} id="titulo" type="text" />
        </div>
        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea ref={descripcion} id="descripcion"></textarea>
        </div>
        <div>
          <label htmlFor="imagen">Imagen</label>
          <input id="imagen" ref={imagen} type="file" />
        </div>
        <input type="submit" value="Agregar" className="boton-agregar" />
      </form>
    </div>
  )
}

export default NuevoContenido
