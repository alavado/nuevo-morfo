import { gql } from 'apollo-boost'

export default gql`
  query Contenido($id: ID!) {
    contenido(id: $id) {
      id
      titulo
      descripcion
      imagenes {
        id
        descripcion
        marcadores {
          id
          titulo
          posicion
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
