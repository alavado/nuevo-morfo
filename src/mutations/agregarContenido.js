import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarContenido(
    $subseccion: ID!
    $titulo: String!
    $descripcion: String
    $tipo: String
    $grupos: [ID!]
  ) {
    agregarContenido(
      subseccion: $subseccion
      titulo: $titulo
      descripcion: $descripcion
      grupos: $grupos
      tipo: $tipo
    ) {
      id
      titulo
      descripcion
      grupos {
        id
      }
    }
  }
`