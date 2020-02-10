import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarImagen($contenido: ID!, $descripcion: String, $archivo: String!) {
    agregarImagen(contenido: $contenido, descripcion: $descripcion, archivo: $archivo) {
      id
    }
  }
`