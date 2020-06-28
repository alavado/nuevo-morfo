import { gql } from 'apollo-boost'

export default gql`
  query Subseccion($id: ID!) {
    subseccion(id: $id) {
      id
      nombre
      contenidos {
        id
        titulo
        deleted
        imagenes {
          archivo
        }
      }
      subsecciones {
        id
        nombre
      }
      seccion {
        id
        nombre
      }
    }
  }
`
