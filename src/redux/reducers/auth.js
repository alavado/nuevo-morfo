import { MOSTRAR_LOGIN, FIJAR_USUARIO, LOGOUT } from "../actionTypes"

const initialState = {
  mostrandoLogin: false,
  usuario: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_LOGIN: {
      return {
        ...state,
        mostrandoLogin: action.payload
      }
    }
    case FIJAR_USUARIO: {
      console.log(action.payload)
      return {
        ...state,
        usuario: action.payload,
        mostrandoLogin: false
      }
    }
    case LOGOUT: {
      return {
        ...state,
        usuario: null
      }
    }
    default:
      return state;
  }
}