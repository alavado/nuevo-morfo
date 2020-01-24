import { combineReducers } from 'redux'
import navegacion from './navegacion'
import contenido from './contenido'

export default combineReducers({
  navegacion,
  contenido
})