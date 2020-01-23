`mutation AgregarContenido($subseccion: ID!, $titulo: String!, $descripcion: String) {
  agregarContenido(subseccion: $subseccion, titulo: $titulo, descripcion: $descripcion) {
    id
    titulo
    descripcion
  }
}`