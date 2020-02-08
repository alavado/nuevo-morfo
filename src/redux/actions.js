import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO, AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR, MOSTRAR_POPUP_MARCADOR, FIJAR_DESTINO, MOSTRAR_LOGIN, FIJAR_USUARIO, MOSTRAR_FORMULARIO_NUEVA_SUBSECCION, MOSTRAR_NAVEGACION } from "./actionTypes";
import { decode } from 'jsonwebtoken'

export const fijarSeccion = datos => ({
  type: FIJAR_SECCION,
  payload: datos
})

export const fijarSubseccion = datos => ({
  type: FIJAR_SUBSECCION,
  payload: datos
})

export const fijarContenido = datos => ({
  type: FIJAR_CONTENIDO,
  payload: datos
})

export const agregarMarcadorAImagenActual = marcador => ({
  type: AGREGAR_MARCADOR,
  payload: marcador
})

export const eliminarMarcadorDeImagenActual = id => ({
  type: ELIMINAR_MARCADOR,
  payload: id
})

export const destacarMarcador = marcador => ({
  type: DESTACAR_MARCADOR,
  payload: marcador
})

export const dejarDeDestacarMarcador = () => ({
  type: DESTACAR_MARCADOR,
  payload: null
})

export const mostrarPopup = datos => ({
  type: MOSTRAR_POPUP_MARCADOR,
  payload: datos
})

export const esconderPopup = () => ({
  type: MOSTRAR_POPUP_MARCADOR,
  payload: null
})

export const fijarDestino = destino => ({
  type: FIJAR_DESTINO,
  payload: destino
})

export const mostrarLogin = () => ({
  type: MOSTRAR_LOGIN,
  payload: true
})

export const esconderLogin = () => ({
  type: MOSTRAR_LOGIN,
  payload: false
})

export const fijarUsuario = token => {
  window.localStorage.setItem('token', token)
  return {
    type: FIJAR_USUARIO,
    payload: {...decode(token), token}
  }
}

export const mostrarFormularioNuevaSeccion = () => ({
  type: MOSTRAR_FORMULARIO_NUEVA_SUBSECCION,
  payload: true
})

export const esconderFormularioNuevaSeccion = () => ({
  type: MOSTRAR_FORMULARIO_NUEVA_SUBSECCION,
  payload: false
})

export const mostrarNavegacion = () => ({
  type: MOSTRAR_NAVEGACION,
  payload: true
})

export const esconderNavegacion = () => ({
  type: MOSTRAR_NAVEGACION,
  payload: false
})