import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO,
  AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR, MOSTRAR_POPUP_MARCADOR, FIJAR_DESTINO,
  MOSTRAR_LOGIN, FIJAR_USUARIO, MOSTRAR_FORMULARIO_NUEVA_SUBSECCION, MOSTRAR_NAVEGACION,
  FIJAR_PROGRESO_SUBIDA_NUEVO_CONTENIDO, CAMBIAR_ESTADO_SUBIDA_NUEVO_CONTENIDO,
  EDITAR_MARCADOR, EDITANDO_MARCADOR, MOSTRAR_FORMULARIO_NUEVO_USUARIO, AGREGAR_USUARIO_NUEVO,
  MOSTRAR_FORMULARIO_NUEVO_GRUPO, MOSTRAR_FORMULARIO_NUEVA_IMAGEN, SELECCIONAR_IMAGEN_DE_CONTENIDO,
  MOSTRAR_FORMULARIO_GRUPOS_USUARIO, LOGOUT,
  MOSTRAR_ADMINISTRACION} from "./actionTypes"
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

export const comenzarSubidaNuevoContenido = () => ({
  type: CAMBIAR_ESTADO_SUBIDA_NUEVO_CONTENIDO,
  payload: true
})

export const terminarSubidaNuevoContenido = () => ({
  type: CAMBIAR_ESTADO_SUBIDA_NUEVO_CONTENIDO,
  payload: false
})

export const fijarProgresoSubidaNuevoContenido = progreso => ({
  type: FIJAR_PROGRESO_SUBIDA_NUEVO_CONTENIDO,
  payload: Math.min(100, Math.max(0, progreso))
})

export const mostrarEdicionMarcador = () => ({
  type: EDITANDO_MARCADOR,
  payload: true
})

export const esconderEdicionMarcador = () => ({
  type: EDITANDO_MARCADOR,
  payload: false
})

export const editarMarcador = marcador => ({
  type: EDITAR_MARCADOR,
  payload: marcador
})

export const mostrarFormularioNuevoUsuario = () => ({
  type: MOSTRAR_FORMULARIO_NUEVO_USUARIO,
  payload: true
})

export const esconderFormularioNuevoUsuario = () => ({
  type: MOSTRAR_FORMULARIO_NUEVO_USUARIO,
  payload: false
})

export const agregarNuevoUsuario = id => ({
  type: AGREGAR_USUARIO_NUEVO,
  payload: id
})

export const mostrarFormularioNuevoGrupo = () => ({
  type: MOSTRAR_FORMULARIO_NUEVO_GRUPO,
  payload: true
})

export const esconderFormularioNuevoGrupo = () => ({
  type: MOSTRAR_FORMULARIO_NUEVO_GRUPO,
  payload: false
})

export const mostrarFormularioNuevaImagen = () => ({
  type: MOSTRAR_FORMULARIO_NUEVA_IMAGEN,
  payload: true
})

export const esconderFormularioNuevaImagen = () => ({
  type: MOSTRAR_FORMULARIO_NUEVA_IMAGEN,
  payload: false
})

export const mostrarImagenDeContenido = i => ({
  type: SELECCIONAR_IMAGEN_DE_CONTENIDO,
  payload: i
})

export const mostrarFormularioGruposUsuario = () => ({
  type: MOSTRAR_FORMULARIO_GRUPOS_USUARIO,
  payload: true
})

export const esconderFormularioGruposUsuario = () => ({
  type: MOSTRAR_FORMULARIO_GRUPOS_USUARIO,
  payload: false
})

export const mostrarAdministracion = () => ({
  type: MOSTRAR_ADMINISTRACION,
  payload: true
})

export const esconderAdministracion = () => ({
  type: MOSTRAR_ADMINISTRACION,
  payload: false
})

export const logout = () => ({
  type: LOGOUT
})