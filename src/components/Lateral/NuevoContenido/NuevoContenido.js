import React from 'react'
import './NuevoContenido.css'
import useLateral from '../../../hooks/useLateral'

const NuevoContenido = () => {

  useLateral()

  const enviarFormulario = e => {
    e.preventDefault()
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
        <input id="imagen" type="file" />
        <input type="submit" value="Agregar" className="boton-agregar" />
      </form>
    </div>
  )
}

export default NuevoContenido
