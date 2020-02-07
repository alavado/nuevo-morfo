import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarContenido($subseccion: ID!, $titulo: String!) {
    agregarContenido(subseccion: $subseccion, titulo: $titulo) {
      id
      titulo
    }
  }
`