import React, { useRef } from 'react'
import axios from 'axios'
import './NuevoContenido.css'
import useLateral from '../../../hooks/useLateral'
import { isDev } from '../../../helpers/dev'
import { useMutation } from '@apollo/react-hooks'
import agregarContenido from '../../../mutations/agregarContenido'

const NuevoContenido = () => {

  const imagen = useRef()
  const [agregar] = useMutation(agregarContenido)

  useLateral()

  const enviarFormulario = e => {
    e.preventDefault()
    // let formData = new FormData()
    // formData.append('imagen', imagen.current.files[0])
    // agregar({
    //   variables: {
    //     titulo: 't',
    //     descripcion: 'd',
    //     subseccion: '5e27955188b9343ff0978e96'
    //   },
    //   con
    // })
    let formData = new FormData()
    formData.append('imagen', imagen.current.files[0])
    console.log(formData)
    axios.post(
      `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/subir_imagen`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then(data => {
      console.log('SUCCESS!!', data)
    })
    .catch(() => {
      console.log('FAILURE!!')
    })
  }

  return (
    <div className="contenedor-formulario-lateral">
      <h2>Nuevo contenido</h2>
      <form onSubmit={enviarFormulario}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" type="text" />
        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion"></textarea>
        <label htmlFor="imagen">Imagen</label>
        <input id="imagen" ref={imagen} type="file" />
        <input type="submit" value="Agregar" className="boton-agregar" />
      </form>
    </div>
  )
}

export default NuevoContenido
