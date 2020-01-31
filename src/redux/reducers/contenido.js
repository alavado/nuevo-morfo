import { FIJAR_CONTENIDO, AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR, MOSTRAR_POPUP } from "../actionTypes"

const initialState = {
  contenido: null,
  imagen: null,
  indiceImagenActual: 0,
  marcadorDestacado: null,
  popup: null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_CONTENIDO: {
      const contenido = action.payload
      return {
        ...state,
        contenido,
        imagen: contenido.imagenes ? contenido.imagenes[0] : null
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
        },
        imagen
      }
    }
    case ELIMINAR_MARCADOR: {
      let imagen = state.contenido.imagenes[state.indiceImagenActual]
      imagen.marcadores = imagen.marcadores.filter(({ id }) => id !== action.payload)
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
    case DESTACAR_MARCADOR: {
      return {
        ...state,
        marcadorDestacado: action.payload
      }
    }
    case MOSTRAR_POPUP: {
      return {
        ...state,
        popup: action.payload
      }
    }
    default:
      return state;
  }
}