import { gql } from 'apollo-boost'

export default gql`
  mutation RestaurarContenido($id: ID!) {
    restaurarContenido(id: $id) {
      id
    }
  }
`