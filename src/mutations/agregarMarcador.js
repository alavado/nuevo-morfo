import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarMarcador($imagen: ID!, $titulo: String!, $lat: Float!, $lng: Float!) {
    agregarMarcador(imagen: $imagen, titulo: $titulo, lat: $lat, lng: $lng) {
      id,
      titulo,
      lat,
      lng
    }
  }
`