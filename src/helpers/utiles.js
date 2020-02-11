export const compararPropiedadString = prop => {
  return (obj1, obj2) => obj1[prop].toLocaleUpperCase().localeCompare(obj2[prop].toLocaleUpperCase())
}