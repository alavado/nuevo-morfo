import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarUsuario($nombre: String!, $email: String!, $password: String!) {
    agregarUsuario(nombre: $nombre, email: $email, password: $password) {
      id
      nombre
      email
    }
  }
`
