import { compararPropiedadString } from "./utiles"

const colores = [
  '#307FE2',
  '#FF6A14',
  '#2CC84D'
]

export const obtenerColorGrupo = (grupos, i) => {
  const grupo = grupos[i]
  return colores[[...grupos].sort(compararPropiedadString('_ts')).findIndex(({ id }) => id === grupo.id)]
}