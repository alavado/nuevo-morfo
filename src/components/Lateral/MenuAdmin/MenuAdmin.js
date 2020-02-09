import React from 'react'
import { Link } from 'react-router-dom'
import './MenuAdmin.css'
import useLateral from '../../../hooks/useLateral'

const MenuAdmin = () => {

  useLateral()

  return (
    <ul className="lista-items">
      <Link to="/usuarios">
        <li>
          Usuarios
        </li>
      </Link>
    </ul>
  )
}

export default MenuAdmin
