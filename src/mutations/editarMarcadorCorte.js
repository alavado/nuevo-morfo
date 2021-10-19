import { gql } from 'apollo-boost'

export default gql`
  mutation editarMarcadorCorte($idImagen: ID!, $idMarcador: ID!, $y: String!) {
    editarMarcadorCorte(idImagen: $idImagen, idMarcador: $idMarcador, y: $y) {
      id
    }
  }
`

