import React from 'react'
import { compararPropiedadString } from '../../../../helpers/utiles'
import _ from 'lodash'
import './ListaSubsecciones.css'
import LinkSubseccion from './LinkSubseccion'

const ListaSubsecciones = ({ data }) => {

  return (
    <ul className="lista-items">
      {data.seccion.subsecciones
        .sort(compararPropiedadString('nombre'))
        .map((subseccion, i) => (
          <LinkSubseccion
            i={i}
            subseccion={subseccion}
            key={subseccion.id}
          />
        ))}
    </ul>
  )
}

export default ListaSubsecciones
