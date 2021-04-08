import { gql } from 'apollo-boost'

export default gql`
  mutation editarMarcadorCorte($id: ID!, $y: String!) {
    editarMarcadorCorte(id: $id, y: $y) {
      id
      titulo
      lat
      lng
    }
  }
`

