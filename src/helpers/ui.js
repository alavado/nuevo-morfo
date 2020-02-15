import { compararPropiedadString } from "./utiles"

const colores = [
  '#307FE2',
  '#FF6A14',
  '#2CC84D'
]

export const obtenerColorGrupo = (grupos, i) => {
  const { id: idGrupo } = grupos[i]
  const indice = [...grupos].sort(compararPropiedadString('_ts')).findIndex(({ id }) => id === idGrupo)
  if (indice >= colores.length) {
    return '#232323'
  }
  return colores[indice]
}