import { gql } from 'apollo-boost'

export default gql`
  mutation EditarMarcador($id: ID!, $titulo: String!) {
    editarMarcador(id: $id, titulo: $titulo) {
      id
      titulo
      lat
      lng
    }
  }
`

