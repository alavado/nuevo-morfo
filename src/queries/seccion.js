import { gql } from 'apollo-boost'

export default gql`
  query Seccion($id: ID!) {
    seccion(id: $id) {
      id
      nombre
      subsecciones {
        id
        nombre
        contenidos {
          id
          deleted
        }
      }
    }
  }
`
