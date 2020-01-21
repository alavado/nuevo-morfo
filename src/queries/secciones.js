import { gql } from 'apollo-boost'

export default gql`
  query {
    secciones {
      id
      nombre
    }
  }
`