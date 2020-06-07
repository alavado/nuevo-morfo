import React from 'react'
import './Landing.css'
import { useSelector } from 'react-redux'
import logoCentral from '../../assets/logo_central.png'

const Buscador = () => {

  const { activa } = useSelector(state => state.navegacion)

  return (
    <div className={`Landing${activa ? ' Landing--compacto' : ''}`}>
      <div></div>
      <div className="Landing__bienvenida">
        <img src={logoCentral} alt="logo morfo uchile" />
        <p>
          Sitio de apoyo docente multimedia para los estudiantes de la
          Facultad de Medicina de la Universidad de Chile
          en el estudio de las Ciencias Morfológicas aplicadas a la Clínica.
        </p>
      </div>
      <div></div>
    </div>
  )
}

export default Buscador
