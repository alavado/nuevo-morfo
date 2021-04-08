import { gql } from 'apollo-boost'

export default gql`
  query Contenido($id: ID!) {
    contenido(id: $id) {
      id
      titulo
      tipo
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
        esCorte
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
