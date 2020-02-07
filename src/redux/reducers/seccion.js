import { MOSTRAR_FORMULARIO_NUEVA_SUBSECCION } from "../actionTypes"

const initialState = {
  mostrandoFormulario: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_NUEVA_SUBSECCION: {
      return {
        ...state,
        mostrandoFormulario: action.payload
      }
    }
    default:
      return state;
  }
}