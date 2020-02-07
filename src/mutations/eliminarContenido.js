import { gql } from 'apollo-boost'

export default gql`
  mutation EliminarContenido($id: ID!) {
    eliminarContenido(id: $id) {
      id
    }
  }
`