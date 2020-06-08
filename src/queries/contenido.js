import { gql } from 'apollo-boost'

export default gql`
  query Contenido($id: ID!) {
    contenido(id: $id) {
      id
      titulo
      descripcion
      deleted
      grupos {
        id
        nombre
        color
      }
      imagenes {
        id
        descripcion
        archivo
        marcadores {
          id
          titulo
          lat
          lng
        }
      }
      subseccion {
        id
        nombre
        seccion {
          id
          nombre
        }
      }
    }
  }
`
