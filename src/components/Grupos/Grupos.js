import React, { useCallback } from 'react'
import query from '../../queries/grupos'
import './Grupos.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus as iconoAgregar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { compararPropiedadString } from '../../helpers/utiles'
import { obtenerColorGrupo } from '../../helpers/ui'

const Grupos = () => {

  const { loading, error, data } = useQuery(query)

  const ordenarGrupos = useCallback(() => (
    data.grupos.sort(compararPropiedadString('nombre'))), [data]
  )

  if (loading) {
    return <MiLoader />
  }

  return (
    <div className="contenedor-tabla-grande">
      <div className="encabezado-tabla">
        <div className="titulo">
          <h1>Grupos</h1>
          <FontAwesomeIcon
            icon={iconoAgregar}
            size="sm"
            title="Agregar grupo"
          />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordenarGrupos().map((g, i) => (
            <tr key={g.id}>
              <td>{g.nombre}</td>
              <td style={{ width: 24 }}>
                <div
                  className="color-grupo"
                  style={{ backgroundColor: obtenerColorGrupo(data.grupos, i) }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Grupos
