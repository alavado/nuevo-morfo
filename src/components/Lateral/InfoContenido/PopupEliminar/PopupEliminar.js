import React from 'react'
import './PopupEliminar.css'

const PopupEliminar = ({ eliminar, cancelar }) => {
  return (
    <div className="PopupEliminar">
      <div className="PopupEliminar__mensaje">
        ¿Segura que deseas eliminar este contenido PARA SIEMPRE?
      </div>
      <div className="PopupEliminar__botones">
        <button
          className="PopupEliminar__boton_cancelar"
          onClick={() => cancelar()}
        >
          Cancelar
        </button>
        <button
          className="PopupEliminar__boton_eliminar"
          onClick={() => eliminar()}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default PopupEliminar
