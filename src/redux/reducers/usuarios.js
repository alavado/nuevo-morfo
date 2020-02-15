import { MOSTRAR_FORMULARIO_NUEVO_USUARIO, AGREGAR_USUARIO_NUEVO } from "../actionTypes"

const initialState = {
  mostrandoDialogoNuevoUsuario: false,
  nuevosUsuarios: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_NUEVO_USUARIO: {
      return {
        ...state,
        mostrandoDialogoNuevoUsuario: action.payload
      }
    }
    case AGREGAR_USUARIO_NUEVO: {
      return {
        ...state,
        nuevosUsuarios: [
          action.payload,
          ...state.nuevosUsuarios
        ]
      }
    }
    default:
      return state;
  }
}