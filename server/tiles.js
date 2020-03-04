const childProcess = require('child_process')
const path = require('path')
const isDev = require('./helpers/dev').isDev()

const crearThumbnail = archivo => {
  const original = path.resolve(`.\\server\\images\\${archivo}\\original.jpg`)
  const pathVipsThumbnail = isDev ? path.resolve('.\\server\\tools\\vips-dev-8.9\\bin\\vipsthumbnail.exe') : 'vipsthumbnail'
  childProcess.execSync(`${pathVipsThumbnail} ${original} --smartcrop centre -s 128`)
}

const crearPiramide = archivo => {
  const destino = path.resolve(`.\\server\\images\\${archivo}\\pyramid`)
  const original = path.resolve(`.\\server\\images\\${archivo}\\original.jpg`)
  const pathVips = isDev ? path.resolve(`.\\server\\tools\\vips-dev-8.9\\bin\\vips.exe`) : 'vips'
  childProcess.execSync(`mkdir ${destino} && ${pathVips} dzsave ${original} ${destino} --layout google`)
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