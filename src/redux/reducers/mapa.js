import { FIJAR_DESTINO } from "../actionTypes"

const initialState = {
  destino: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_DESTINO: {
      return {
        ...state,
        destino: action.payload
      }
    }
    default:
      return state;
  }
}