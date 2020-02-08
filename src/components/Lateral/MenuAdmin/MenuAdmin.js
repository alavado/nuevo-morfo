import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MenuAdmin.css'
import { useDispatch } from 'react-redux'
import { mostrarNavegacion } from '../../../redux/actions'

const MenuAdmin = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(mostrarNavegacion())
  }, [])

  return (
    <ul className="lista-items">
      <Link to="/usuarios">
        <li>
          Usuarios
        </li>
      </Link>
      <Link>
        <li>
          Contenidos
        </li>
      </Link>
      <Link>
        <li>
          Grupos
        </li>
      </Link>
    </ul>
  )
}

export default MenuAdmin
