import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO, AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR } from "./actionTypes";

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