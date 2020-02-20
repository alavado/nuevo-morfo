import { gql } from 'apollo-boost'

export default gql`
  mutation EditarUsuario($id: ID!, $grupos: [ID!]) {
    editarUsuario(id: $id, grupos: $grupos) {
      id
      grupos {
        id
        nombre
      }
    }
  }
`

