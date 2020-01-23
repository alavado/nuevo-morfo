import { FIJAR_SECCION, FIJAR_SUBSECCION } from "./actionTypes";

export const fijarSeccion = datos => ({
  type: FIJAR_SECCION,
  payload: datos
})

export const fijarSubseccion = datos => ({
  type: FIJAR_SUBSECCION,
  payload: datos
})