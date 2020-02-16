import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarGrupo($nombre: String!) {
    agregarGrupo(nombre: $nombre) {
      id
      nombre
    }
  }
`
