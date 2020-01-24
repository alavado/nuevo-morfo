import { FIJAR_CONTENIDO } from "../actionTypes"

const initialState = {
  contenido: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_CONTENIDO: {
      return {
        ...state,
        contenido: action.payload
      }
    }
    default:
      return state;
  }
}