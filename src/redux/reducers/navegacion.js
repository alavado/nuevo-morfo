import { FIJAR_SECCION, FIJAR_SUBSECCION, FIJAR_CONTENIDO } from "../actionTypes"

const initialState = {
  seccion: null,
  subseccion: null
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
      return {
        ...state,
        seccion: contenido.subseccion.seccion,
        subseccion: contenido.subseccion
      }
    }
    default:
      return state;
  }
}