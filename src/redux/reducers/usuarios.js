import { MOSTRAR_FORMULARIO_NUEVO_USUARIO, AGREGAR_USUARIO_NUEVO, MOSTRAR_FORMULARIO_GRUPOS_USUARIO } from "../actionTypes"

const initialState = {
  mostrandoDialogoNuevoUsuario: false,
  mostrandoDialogoGrupos: false,
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
    case MOSTRAR_FORMULARIO_GRUPOS_USUARIO: {
      return {
        ...state,
        mostrandoDialogoGrupos: action.payload
      }
    }
    default:
      return state;
  }
}