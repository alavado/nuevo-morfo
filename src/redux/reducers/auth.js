import { MOSTRAR_LOGIN } from "../actionTypes"

const initialState = {
  mostrandoLogin: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case MOSTRAR_LOGIN: {
      return {
        ...state,
        mostrandoLogin: action.payload
      }
    }
    default:
      return state;
  }
}