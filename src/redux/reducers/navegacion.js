import { FIJAR_SECCION, FIJAR_SUBSECCION } from "../actionTypes"

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
    default:
      return state;
  }
}