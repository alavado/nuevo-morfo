import React, { useState, useEffect } from 'react'
import './Cortes.css'
import { useSelector, useDispatch } from 'react-redux'
import { mostrarImagenDeContenido } from '../../redux/actions'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Draggable from 'react-draggable'
import { useMutation } from '@apollo/react-hooks'
import agregarFondoCorte from '../../mutations/agregarFondoCorte'
import axios from 'axios'
import { isDev } from '../../helpers/dev'
import { esAdmin } from '../../helpers/auth'
import editarMarcadorCorte from '../../mutations/editarMarcadorCorte'

const Cortes = () => {

  const { indiceImagenActual, contenido } = useSelector(state => state.contenido)
  const { usuario } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [abierto, setAbierto] = useState(false)
  const [imagenes, setImagenes] = useState([])
  const [imagen, setImagen] = useState(null)
  const [mutateAgregarFondoCorte] = useMutation(agregarFondoCorte)
  const [mutateEditarCorte] = useMutation(editarMarcadorCorte)

  const hayCorte = contenido.imagenes.find(i => i.esCorte)

  useEffect(() => {
    console.log(contenido)
    if (contenido && contenido.imagenes) {
      setImagenes(contenido.imagenes
        .filter(i => !i.esCorte)
        .map((img, i) => ({ ...img, y: Number(hayCorte.marcadores[i]?.lat || 0) }))
      )
    }
  }, [contenido])

  console.log(imagenes)

  if (!imagenes) {
    return '...'
  }

  const test = (e, i, id) => {
    setImagenes(prev => {
      prev[i].y = e.y - e.offsetY - 55
      return [...prev]
    })
    mutateEditarCorte({
      variables: {
        idImagen: hayCorte.id,
        idMarcador: id,
        y: `${e.y}`
      }
    })
    .catch(err => console.log(err))
  }

  const agregarImagenCorte = e => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('imagen', imagen)
    axios.post(
      `${isDev ? 'http://localhost:1027' : 'https://compsci.cl/nuevo-morfo'}/subir_imagen`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    .then(({ data: archivo }) => {
      mutateAgregarFondoCorte({
        variables: { contenido: contenido.id, archivo },
        awaitRefetchQueries: true
      })
      .then(() => window.location.reload())
    })
    .catch(err => {
      console.error('Error subiendo imagen', err)
    })
  }

  return (
    <div className={`Cortes${abierto ? ' Cortes--abierto' : ''}`}>
      <div
        className="Cortes__boton_cerrar"
        onClick={() => setAbierto(!abierto)}
      >
        <FontAwesomeIcon icon={abierto ? faCaretRight : faCaretLeft} />
        <div className="Cortes__boton_cerrar_texto">
          Cortes
        </div>
      </div>
      <div className="Cortes__contenedor_pierna">
        {hayCorte
          ? <>
              <img
                alt="Fondo cortes"
                className="Cortes__imagen_fondo"
                src={`${isDev ? 'http://localhost:1027' : 'https://compsci.cl/nuevo-morfo'}/thumbnail/${hayCorte.archivo}`}
              />
              {imagenes.map((imagen, i) => (
                <div
                  className="Cortes__marcador_y"
                  key={`marcador-imagen-${i}`}
                  style={{
                    top: `calc(${imagen.y}px + .75rem)`,
                    backgroundColor: indiceImagenActual === i ? '#D4001C' : 'rgba(255, 255, 255, .8)'
                  }}
                  onClick={() => dispatch(mostrarImagenDeContenido(i))}
                >
                </div>
              ))}
            </>
          : <div className="Cortes__no_hay_aun">
              Todavía no hay un mapa de cortes para esta imagen
              {esAdmin(usuario) &&
                <form onSubmit={agregarImagenCorte}>
                  <input type="file" onChange={e => setImagen(e.target.files[0])}  />
                  <button type="submit">Agregar</button>
                </form>
              }
            </div>
        }
        {imagenes.map(({ id, archivo }, i) => (
          <Draggable
            key={`miniatura-Cortes-${i}`}
            onStop={e => test(e, i, id)}
            bounds="parent"
          >
            <img
              src={`${isDev ? 'http://localhost:1027' : 'https://compsci.cl/nuevo-morfo'}/thumbnail/${archivo}`}
              alt="imagen contenido"
              onClick={() => dispatch(mostrarImagenDeContenido(i))}
              className={`Cortes__miniatura_imagen${indiceImagenActual === i ? ' Cortes__miniatura_imagen_seleccionada' : ''}`}
            />
          </Draggable>
        ))}
      </div>
    </div>
  )
}

export default Cortes
