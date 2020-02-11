export const compararPropiedadString = prop => {
  return (obj1, obj2) => obj1[prop].toLocaleUpperCase() > obj2[prop].toLocaleUpperCase() ? 1 : -1
}