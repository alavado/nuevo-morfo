import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './NuevoContenido.css'
import useLateral from '../../../hooks/useLateral'
import { isDev } from '../../../helpers/dev'
import { useMutation, useQuery } from '@apollo/react-hooks'
import agregarContenidoMutation from '../../../mutations/agregarContenido'
import agregarImagenMutation from '../../../mutations/agregarImagen'
import query from '../../../queries/subseccion'
import queryGrupos from '../../../queries/grupos'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { comenzarSubidaNuevoContenido, terminarSubidaNuevoContenido, fijarProgresoSubidaNuevoContenido } from '../../../redux/actions'

const NuevoContenido = () => {

  const [titulo, setTitulo] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [grupos, setGrupos] = useState([])
  const { subseccion } = useParams()
  const [envioBloqueado, setEnvioBloqueado] = useState(false)
  const [imagen, setImagen] = useState(null)
  const [agregarContenido] = useMutation(agregarContenidoMutation)
  const [agregarImagen] = useMutation(agregarImagenMutation)
  const { loading: cargandoGrupos, data: dataGrupos } = useQuery(queryGrupos)
  const history = useHistory()
  const dispatch = useDispatch()

  useLateral()

  useEffect(() => {
    dispatch(fijarProgresoSubidaNuevoContenido(0))
  }, [])

  const enviarFormulario = e => {
    e.preventDefault()
    setEnvioBloqueado(true)
    let contenido = ''
    agregarContenido({ variables: { titulo, descripcion, subseccion, grupos } })
      .then(({ data }) => {
        contenido = data.agregarContenido.id
        let formData = new FormData()
        formData.append('imagen', imagen)
        dispatch(comenzarSubidaNuevoContenido())
        return axios.post(
          `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/subir_imagen`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: p => dispatch(fijarProgresoSubidaNuevoContenido(100 * p.loaded / imagen.size))
          }
        )
      })
      .then(({ data: archivo }) => {
        dispatch(terminarSubidaNuevoContenido())
        agregarImagen({
          variables: { contenido, archivo },
          refetchQueries: [{ query, variables: { id: subseccion } }],
          awaitRefetchQueries: true
        })
      })
      .then(() => history.push(`/contenido/${contenido}`))
      .catch(err => {
        setEnvioBloqueado(false)
        console.error('Error subiendo imagen', err)
      })
  }

  const fijarGrupo = (id, agregar) => {
    setGrupos(agregar ? [...grupos, id] : grupos.filter(g => g !== id))
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
        <div>
          <label htmlFor="grupos">Grupos</label>
          {!cargandoGrupos && dataGrupos.grupos.map(grupo => grupo.nombre !== 'Administración' && (
            <div className="contenedor-checkbox-grupo" key={grupo.id}>
              <input
                type="checkbox"
                value={grupo.id}
                onChange={e => fijarGrupo(grupo.id, e.target.checked)}
              />
              <label>{grupo.nombre}</label>
            </div>
          ))}
        </div>
        <input
          type="submit"
          value="Agregar"
          className="boton-agregar"
          disabled={envioBloqueado || titulo.length < 3 || !imagen}
        />
      </form>
    </div>
  )
}

export default NuevoContenido
