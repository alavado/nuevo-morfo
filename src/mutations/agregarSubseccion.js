import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarSubseccion($seccion: ID!, $nombre: String!, $subseccion: ID) {
    agregarSubseccion(seccion: $seccion, nombre: $nombre, subseccion: $subseccion) {
      id
      nombre
    }
  }
`