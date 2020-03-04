const childProcess = require('child_process')
const isDev = require('./helpers/dev').isDev()

const crearThumbnail = archivo => {
  if (isDev) {
    const original = `.\\server\\images\\${archivo}\\original.jpg`
    const pathVipsThumbnail = '.\\server\\tools\\vips-dev-8.9\\bin\\vipsthumbnail.exe'
    childProcess.execSync(`${pathVipsThumbnail} ${original} --smartcrop centre -s 128`)
  }
  else {
    const original = `./server/images/${archivo}/original.jpg`
    childProcess.execSync(`vipsthumbnail ${original} --smartcrop centre -s 128`)
  }
}

const crearPiramide = archivo => {
  if (isDev) {
    const destino = `.\\server\\images\\${archivo}\\pyramid`
    const original = `.\\server\\images\\${archivo}\\original.jpg`
    const pathVips = `.\\server\\tools\\vips-dev-8.9\\bin\\vips.exe`
    childProcess.execSync(`mkdir ${destino} && ${pathVips} dzsave ${original} ${destino} --layout google`)
  }
  else {
    const destino = `./server/images/${archivo}/pyramid`
    const original = `./server/images/${archivo}/original.jpg`
    childProcess.execSync(`mkdir ${destino} && vips dzsave ${original} ${destino} --layout google`)
  }
}

module.exports = {
  crearThumbnail,
  crearPiramide
}

/*
Instalé vips desde github según sale en:

https://libvips.github.io/libvips/install.html

pero con esta corrección:

I was able to resolve the issue by following these steps.
Added usrlocal.conf file with following line into /etc/ld.so.conf.d

/usr/local/lib

Then ran ldconfig -v as root upon save

Thank you very much for the help.
*/