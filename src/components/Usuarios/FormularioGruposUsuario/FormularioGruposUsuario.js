import React, { useState, useEffect } from 'react'
import './FormularioGruposUsuario.css'
import { useDispatch } from 'react-redux'
import { esconderFormularioGruposUsuario } from '../../../redux/actions'
import editarUsuarioMutation from '../../../mutations/editarUsuario'
import query from '../../../queries/grupos'
import { useMutation, useQuery } from '@apollo/react-hooks'
import MiLoader from '../../Loader'
import { compararPropiedadString } from '../../../helpers/utiles'
import _ from 'lodash'

const FormularioGruposUsuario = ({ usuario }) => {

  const [grupos, setGrupos] = useState(usuario.grupos.map(g => g.id))
  const dispatch = useDispatch()
  const [actualizarUsuarioMutate] = useMutation(editarUsuarioMutation)
  const { loading, error, data } = useQuery(query)

  const actualizarGrupos = e => {
    e.preventDefault()
    actualizarUsuarioMutate({
      variables: { id: usuario.id, grupos }
    })
    .then(() => dispatch(esconderFormularioGruposUsuario()))
    .catch(err => console.log(err))
  }

  const toggleGrupo = (id, agregar) => {
    if (agregar) {
      setGrupos([...grupos, id])
    }
    else {
      setGrupos(grupos.filter(g => g !== id))
    }
  }

  useEffect(() => () => dispatch(esconderFormularioGruposUsuario()), [])

  return (
    <div
      className="seccion-fondo-oscuro"
      onClick={() => dispatch(esconderFormularioGruposUsuario())}
    >
      <div
        className="contenedor-formulario"
        onClick={e => e.stopPropagation()}
      >
        <h3>Grupos a los que pertenece<br />{usuario.nombre}</h3>
        {loading ? <MiLoader /> :
          <form onSubmit={actualizarGrupos} className="contenedor-checkboxes">
            {data.grupos.sort(compararPropiedadString('nombre')).map(grupo => (
              <label key={`label-${grupo.id}`}>
                <input
                  type="checkbox"
                  defaultChecked={grupos.includes(grupo.id)}
                  onChange={e => toggleGrupo(grupo.id, e.target.checked)}
                />
                <span style={{ backgroundColor: grupo.color }}>{grupo.nombre}</span>
              </label>
            ))}
            <input type="submit" value="Actualizar grupos" />
          </form>
        }
      </div>
    </div>
  )
}

export default FormularioGruposUsuario
