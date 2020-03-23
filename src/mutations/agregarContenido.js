import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarContenido($subseccion: ID!, $titulo: String!, $descripcion: String, $grupos: [ID!]) {
    agregarContenido(subseccion: $subseccion, titulo: $titulo, descripcion: $descripcion, grupos: $grupos) {
      id
      titulo
      descripcion
      grupos {
        id
      }
    }
  }
`