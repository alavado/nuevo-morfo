import { gql } from 'apollo-boost'

export default gql`
  mutation EliminarMarcador($id: ID!) {
    eliminarMarcador(id: $id) {
      id
    }
  }
`