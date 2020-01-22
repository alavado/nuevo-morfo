import { FIJAR_SECCION } from "../actionTypes"

const initialState = {
  seccion: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_SECCION: {
      return {
        ...state,
        seccion: action.payload
      }
    }
    default:
      return state;
  }
}