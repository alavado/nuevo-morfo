import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO, AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR, MOSTRAR_POPUP, FIJAR_DESTINO, MOSTRAR_LOGIN, FIJAR_USUARIO } from "./actionTypes";

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
  type: MOSTRAR_POPUP,
  payload: datos
})

export const esconderPopup = () => ({
  type: MOSTRAR_POPUP,
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

export const fijarUsuario = usuario => ({
  type: FIJAR_USUARIO,
  payload: usuario
})