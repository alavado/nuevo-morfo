import { MOSTRAR_FORMULARIO_NUEVO_USUARIO } from "../actionTypes"

const initialState = {
  mostrandoDialogoNuevoUsuario: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_NUEVO_USUARIO: {
      return {
        ...state,
        mostrandoDialogoNuevoUsuario: action.payload
      }
    }
    default:
      return state;
  }
}