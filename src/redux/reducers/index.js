import { combineReducers } from 'redux'
import navegacion from './navegacion'
import contenido from './contenido'
import mapa from './mapa'
import auth from './auth'

export default combineReducers({
  navegacion,
  contenido,
  mapa,
  auth
})