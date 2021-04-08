import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarImagen(
    $contenido: ID!
    $archivo: String!
  ) {
    agregarImagen(
      contenido: $contenido
      descripcion: "Fondo cortes"
      archivo: $archivo
      esCorte: true
    ) {
      id
    }
  }
`