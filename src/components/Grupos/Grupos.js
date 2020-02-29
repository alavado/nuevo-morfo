import React, { useCallback } from 'react'
import query from '../../queries/grupos'
import './Grupos.css'
import { useQuery } from '@apollo/react-hooks'
import MiLoader from '../Loader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderPlus as iconoAgregar } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import { compararPropiedadString } from '../../helpers/utiles'
import { useSelector, useDispatch } from 'react-redux'
import FormularioNuevoGrupo from './FormularioNuevoGrupo'
import { mostrarFormularioNuevoGrupo } from '../../redux/actions'

const Grupos = () => {

  const dispatch = useDispatch()
  const { mostrandoFormularioNuevoGrupo } = useSelector(state => state.grupos)
  const { loading, error, data } = useQuery(query)

  const ordenarGrupos = useCallback(() => (
    data.grupos.sort(compararPropiedadString('nombre'))), [data]
  )

  if (loading) {
    return <MiLoader />
  }

  return (
    <>
      {mostrandoFormularioNuevoGrupo && <FormularioNuevoGrupo />}
      <div className="contenedor-tabla-grande">
        <div className="encabezado-tabla">
          <div className="titulo">
            <h1>Grupos</h1>
            <FontAwesomeIcon
              icon={iconoAgregar}
              size="sm"
              title="Agregar grupo"
              className="boton-agregar"
              onClick={() => dispatch(mostrarFormularioNuevoGrupo())}
            />
          </div>
        </div>
        <table className="tabla-grupos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ordenarGrupos().map(grupo => (
              <tr key={grupo.id}>
                <td>{grupo.nombre}</td>
                <td style={{ width: 24 }}>
                  <div
                    className="color-grupo"
                    style={{ backgroundColor: grupo.color }}
                  />
                </td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Grupos
