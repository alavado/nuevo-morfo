import { gql } from 'apollo-boost'

export default gql`
  mutation AgregarMarcador($imagen: ID!, $titulo: String!, $posicion: String!) {
    agregarMarcador(imagen: $imagen, titulo: $titulo, posicion: $posicion) {
      id,
      titulo,
      posicion
    }
  }
`