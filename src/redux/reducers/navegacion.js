import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO, MOSTRAR_NAVEGACION, MOSTRAR_ADMINISTRACION } from "../actionTypes"

const initialState = {
  seccion: null,
  subseccion: null,
  mostrandoAdministracion: false,
  activa: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_SECCION: {
      return {
        ...state,
        seccion: action.payload,
        subseccion: action.payload === null ? null : state.subseccion
      }
    }
    case FIJAR_SUBSECCION: {
      return {
        ...state,
        subseccion: action.payload
      }
    }
    case FIJAR_CONTENIDO: {
      const contenido = action.payload
      if (!contenido.subseccion) {
        return state
      }
      return {
        ...state,
        seccion: contenido.subseccion.seccion,
        subseccion: contenido.subseccion
      }
    }
    case MOSTRAR_NAVEGACION: {
      return {
        ...state,
        activa: action.payload
      }
    }
    case MOSTRAR_ADMINISTRACION: {
      return {
        ...state,
        mostrandoAdministracion: action.payload
      }
    }
    default:
      return state;
  }
}