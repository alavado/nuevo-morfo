import { gql } from 'apollo-boost'

export default gql`
  {
    usuarios {
      id
      nombre
      email
    }
  }
`