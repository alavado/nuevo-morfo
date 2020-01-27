import { FIJAR_CONTENIDO, AGREGAR_MARCADOR } from "../actionTypes"

const initialState = {
  contenido: null,
  indiceImagenActual: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_CONTENIDO: {
      return {
        ...state,
        contenido: action.payload
      }
    }
    case AGREGAR_MARCADOR: {
      let imagen = state.contenido.imagenes[state.indiceImagenActual]
      imagen.marcadores = [...imagen.marcadores, action.payload]
      return {
        ...state,
        contenido: {
          ...state.contenido,
          imagenes: [
            ...state.contenido.imagenes.splice(state.indiceImagenActual, 1),
            imagen
          ]
        }
      }
    }
    default:
      return state;
  }
}