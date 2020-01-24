`mutation AgregarImagen($contenido: ID!, $descripcion: String) {
  agregarImagen(contenido: $contenido, descripcion: $descripcion) {
    id
    descripcion
  }
}`