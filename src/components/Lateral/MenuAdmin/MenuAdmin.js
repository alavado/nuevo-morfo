import React from 'react'
import { Link } from 'react-router-dom'
import './MenuAdmin.css'

const MenuAdmin = () => {
  return (
    <ul className="lista-items">
      <Link>
        <li>
          Usuarios
        </li>
      </Link>
      <Link>
        <li>
          Contenidos
        </li>
      </Link>
    </ul>
  )
}

export default MenuAdmin
