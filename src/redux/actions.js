import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO, AGREGAR_MARCADOR } from "./actionTypes";

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