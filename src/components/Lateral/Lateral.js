import React, { useEffect, useRef } from 'react'
import { Route, Switch } from 'react-router-dom'
import './Lateral.css'
import MenuSeccion from './MenuSeccion'
import MenuSubseccion from './MenuSubseccion'
import Breadcrumb from './Breadcrumb'
import InfoContenido from '../InfoContenido'
import MenuAdmin from './MenuAdmin'
import NuevoContenido from './NuevoContenido'
import { useSelector } from 'react-redux'

const Lateral = () => {

  const { activa } = useSelector(state => state.navegacion)

  return (
    <aside className={activa ? 'visible' : ''}>
      <Breadcrumb />
      <Switch>
        <Route path="/admin" component={MenuAdmin} />
        <Route path="/usuarios" component={MenuAdmin} />
        <Route path="/grupos" component={MenuAdmin} />
        <Route path="/seccion/:id" component={MenuSeccion} />
        <Route path="/subseccion/:id" component={MenuSubseccion} />
        <Route path="/contenido/nuevo/:subseccion" exact component={NuevoContenido} />
        <Route path="/contenido/:id" component={InfoContenido} />
      </Switch>
    </aside>
  )
}

export default Lateral
