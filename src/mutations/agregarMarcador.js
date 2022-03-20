import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarMarcador($imagen: ID!, $titulo: String!, $color: String!, $lat: Float!, $lng: Float!) {
    agregarMarcador(imagen: $imagen, titulo: $titulo, color: $color, lat: $lat, lng: $lng) {
      id,
      titulo,
      color,
      lat,
      lng
    }
  }
`