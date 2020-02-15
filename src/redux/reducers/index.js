import { combineReducers } from 'redux'
import navegacion from './navegacion'
import contenido from './contenido'
import mapa from './mapa'
import auth from './auth'
import seccion from './seccion'
import usuarios from './usuarios'

export default combineReducers({
  navegacion,
  contenido,
  mapa,
  auth,
  seccion,
  usuarios
})