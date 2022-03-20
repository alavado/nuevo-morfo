import { gql } from 'apollo-boost'

export default gql`
  mutation EditarMarcador($id: ID!, $titulo: String!, $color: String!) {
    editarMarcador(id: $id, titulo: $titulo, color: $color) {
      id
      titulo
      lat
      lng
      color
    }
  }
`

