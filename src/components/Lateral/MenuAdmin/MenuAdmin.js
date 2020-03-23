import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MenuAdmin.css'
import useLateral from '../../../hooks/useLateral'
import { useDispatch } from 'react-redux'
import { esconderAdministracion } from '../../../redux/actions'

const MenuAdmin = () => {

  const dispatch = useDispatch()

  useLateral()

  useEffect(() => () => dispatch(esconderAdministracion()), [dispatch])

  return (
    <ul className="lista-items">
      <Link to="/usuarios">
        <li>
          Usuarios
        </li>
      </Link>
      <Link to="/grupos">
        <li>
          Grupos
        </li>
      </Link>
    </ul>
  )
}

export default MenuAdmin
