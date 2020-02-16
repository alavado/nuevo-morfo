import { MOSTRAR_FORMULARIO_NUEVO_GRUPO } from "../actionTypes"

const initialState = {
  mostrandoDialogoNuevoGrupo: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_NUEVO_GRUPO: {
      return {
        ...state,
        mostrandoDialogoNuevoUsuario: action.payload
      }
    }
    default:
      return state;
  }
}