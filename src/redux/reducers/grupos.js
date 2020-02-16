import { MOSTRAR_FORMULARIO_NUEVO_GRUPO } from "../actionTypes"

const initialState = {
  mostrandoFormularioNuevoGrupo: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_FORMULARIO_NUEVO_GRUPO: {
      return {
        ...state,
        mostrandoFormularioNuevoGrupo: action.payload
      }
    }
    default:
      return state;
  }
}