import React, { useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import './MenuAdmin.css'
import useLateral from '../../../hooks/useLateral'
import { useDispatch, useSelector } from 'react-redux'
import { esconderAdministracion } from '../../../redux/actions'
import { esAdmin } from '../../../helpers/auth'

const MenuAdmin = () => {

  const dispatch = useDispatch()
  const { usuario } = useSelector(state => state.auth)

  useLateral()

  useEffect(() => () => dispatch(esconderAdministracion()), [dispatch])

  if (!usuario || !esAdmin(usuario)) {
    return <Redirect to="/" />
  }

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
