import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarGrupo($nombre: String!, $color: String!) {
    agregarGrupo(nombre: $nombre, color: $color) {
      id
      nombre
      color
    }
  }
`
