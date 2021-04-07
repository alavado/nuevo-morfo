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

const TIPOS = [
  {
    id: 'TIPO_IMAGEN_GRANDE',
    label: 'Imagen grande'
  },
  {
    id: 'TIPO_SLIDER',
    label: 'Slider'
  }
]

const NuevoContenido = () => {

  const [tipo, setTipo] = useState(TIPOS[0].id)
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
    agregarContenido({ variables: { tipo, titulo, descripcion, subseccion, grupos } })
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
    <div className="NuevoContenido">
      <h2 className="NuevoContenido__titulo">Nuevo contenido</h2>
      <form className="NuevoContenido__formulario" onSubmit={enviarFormulario}>
        <div className="NuevoContenido__campo">
          <label
            className="NuevoContenido__label"
            htmlFor="tipo"
          >
            Tipo
          </label>
          <select
            id="tipo"
            name="tipo"
            className="NuevoContenido__input"
            onChange={e => setTipo(e.target.value)}
          >
            {TIPOS.map(tipo => (
              <option
                key={`option-${tipo.id}`}
                value={tipo.id}
              >
                {tipo.label}
              </option>
            ))}
          </select>
        </div>
        <div className="NuevoContenido__campo">
          <label
            className="NuevoContenido__label"
            htmlFor="titulo"
          >
            Título
          </label>
          <input
            className="NuevoContenido__input"
            onChange={e => setTitulo(e.target.value)}
            id="titulo"
            type="text"
          />
        </div>
        <div className="NuevoContenido__campo">
          <label
            className="NuevoContenido__label"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <textarea
            onChange={e => setDescripcion(e.target.value)}
            id="descripcion"
            className="NuevoContenido__textarea"
          ></textarea>
        </div>
        <div className="NuevoContenido__campo">
          <label
            className="NuevoContenido__label"
            htmlFor="imagen"
          >
            Imagen
          </label>
          <input
            onChange={e => setImagen(e.target.files[0])}
            id="imagen"
            type="file"
            className="NuevoContenido__input"
          />
        </div>
        <div className="NuevoContenido__campo">
          <label className="NuevoContenido__label" htmlFor="grupos">Grupos</label>
          {!cargandoGrupos && dataGrupos.grupos.map(grupo => grupo.nombre !== 'Administración' && (
            <div className="NuevoContenido__contenedor_cb" key={grupo.id}>
              <input
                className="NuevoContenido__cb_grupo"
                type="checkbox"
                id={`cb-grupo-${grupo.id}`}
                value={grupo.id}
                onChange={e => fijarGrupo(grupo.id, e.target.checked)}
              />
              <label 
                className="NuevoContenido__label_cb_grupo"
                htmlFor={`cb-grupo-${grupo.id}`}
              >
                {grupo.nombre}
              </label>
            </div>
          ))}
        </div>
        <input
          type="submit"
          value="Agregar"
          className="NuevoContenido__boton_agregar"
          disabled={envioBloqueado || titulo.length < 3 || !imagen || grupos.length < 1}
        />
      </form>
    </div>
  )
}

export default NuevoContenido
