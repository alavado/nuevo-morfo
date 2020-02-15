import { gql } from 'apollo-boost'

export default gql`
  {
    grupos {
      id
      nombre
      _ts
    }
  }
`