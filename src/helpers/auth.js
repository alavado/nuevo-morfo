import { isDev } from "./dev"

export const logout = () => {
  localStorage.removeItem('token')
}

export const esAdmin = usuario => {
  const idGrupoAdmin = isDev ? '5e481902522bcb34fc72cb26' : '5edd5b0668cee22c5597bfc5'
  return usuario && usuario.grupos.includes(idGrupoAdmin) 
}