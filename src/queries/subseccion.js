import { gql } from 'apollo-boost'

export default gql`
  query subseccion($id: ID!) {
    subseccion(id: $id) {
      id
      nombre
      contenidos {
        id
        titulo
      }
      seccion {
        id
        nombre
      }
    }
  }
`
