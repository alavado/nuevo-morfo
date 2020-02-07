import { gql } from 'apollo-boost'

export default gql`
  mutation EliminarSubseccion($id: ID!) {
    eliminarSubseccion(id: $id) {
      id
    }
  }
`