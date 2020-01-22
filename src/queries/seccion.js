import { gql } from 'apollo-boost'

export default gql`
  query seccion($id: ID!) {
    seccion(id: $id) {
      id
      nombre
      subsecciones {
        id
        nombre
      }
    }
  }
`
