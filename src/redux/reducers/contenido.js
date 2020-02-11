import { FIJAR_CONTENIDO, AGREGAR_MARCADOR, ELIMINAR_MARCADOR, DESTACAR_MARCADOR, MOSTRAR_POPUP_MARCADOR, FIJAR_PROGRESO_SUBIDA_NUEVO_CONTENIDO, CAMBIAR_ESTADO_SUBIDA_NUEVO_CONTENIDO } from "../actionTypes"

const initialState = {
  contenido: null,
  indiceImagenActual: 0,
  marcadorDestacado: null,
  popup: null,
  nuevoContenido: {
    subiendo: false,
    progresoSubida: 0
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FIJAR_CONTENIDO: {
      const contenido = action.payload
      return {
        ...state,
        contenido
      }
    }
    case AGREGAR_MARCADOR: {
      let imagen = state.contenido.imagenes[state.indiceImagenActual]
      imagen.marcadores = [...imagen.marcadores, action.payload]
      let imagenes = [...state.contenido.imagenes]
      imagenes[state.indiceImagenActual] = imagen
      return {
        ...state,
        contenido: {
          ...state.contenido,
          imagenes
        }
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
    case MOSTRAR_POPUP_MARCADOR: {
      return {
        ...state,
        popup: action.payload
      }
    }
    case FIJAR_PROGRESO_SUBIDA_NUEVO_CONTENIDO: {
      return {
        ...state,
        nuevoContenido: {
          ...state.nuevoContenido,
          progresoSubida: action.payload
        }
      }
    }
    case CAMBIAR_ESTADO_SUBIDA_NUEVO_CONTENIDO: {
      return {
        ...state,
        nuevoContenido: {
          ...state.nuevoContenido,
          subiendo: action.payload
        }
      }
    }
    default:
      return state;
  }
}