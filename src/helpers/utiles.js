const localeIndexOf = require('locale-index-of')(Intl)

export const compararPropiedadString = prop => {
  return (obj1, obj2) => obj1[prop].toLocaleUpperCase().localeCompare(obj2[prop].toLocaleUpperCase())
}

export const busqueda = (termino, frase) => {
  return localeIndexOf(frase, termino, 'es', { sensitivity: 'base' })
}