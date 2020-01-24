import { isDev } from "./dev";


export const parametrosMapa = {
  minZoom: 1.7,
  maxZoom: 4,
  marcador: `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`,
  tamañoMarcador: 20
}

export const construirMapStyle = idImagen => ({
  version: 8,
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [
        `${isDev ? 'http://localhost' : 'https://compsci.cl'}:1027/foto/${idImagen}/{z}/{x}/{y}`
      ],
      tileSize: 128,
      attribution:
        `
          ® Imágenes propiedad del
          <a target="_blank" rel="noopener" href="http://www.medicina.uchile.cl/facultad/campus-y-departamentos/campus-norte/anatomia-y-medicina-legal">
            Departamento de Anatomía y Medicina Legal
          </a>
          de la
          <a target="_blank" rel="noopener" href="https://uchile.cl">
            Universidad de Chile
          </a>
        `
    }
  },
  layers: [
    {
      id: 'simple-tiles',
      type: 'raster',
      source: 'raster-tiles'
    }
  ],
})