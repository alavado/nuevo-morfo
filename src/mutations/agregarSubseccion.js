import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarSubseccion($seccion: ID!, $nombre: String!) {
    agregarSubseccion(seccion: $seccion, nombre: $nombre) {
      id
      nombre
    }
  }
`