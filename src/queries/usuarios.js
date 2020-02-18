import { gql } from 'apollo-boost'

export default gql`
  {
    usuarios {
      id
      nombre
      email
      grupos {
        id
        nombre
        color
      }
    }
  }
`