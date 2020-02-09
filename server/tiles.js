// este es el comando:
// .\server\tools\vips-dev-8.9\bin\vips.exe
//    dzsave 
//    .\server\images\parque_croacia\parque_croacia.jpg
//    .\server\images\parque_croacia\pyramid
//    --layout google

//mkdir .\server\images\IMG_0688 && mv .\server\images\IMG_0688.JPG .\server\images\IMG_0688\IMG_0688.JPG && mkdir .\server\images\IMG_0688\pyramid && .\server\tools\vips-dev-8.9\bin\vips.exe dzsave .\server\images\IMG_0688\IMG_0688.JPG .\server\images\IMG_0688\pyramid --layout google


// para hacer thumbnails
//./server/tools/vips-dev-8.9/bin/vipsthumbnail.exe ./server/images/5e2afdf0d5860c5154afb22d/original.jpg --smartcrop centre -s 128

const childProcess = require('child_process')
const path = require('path')

const crearThumbnail = archivo => {
  childProcess.execSync(`${path.resolve('server\\tools\\vips-dev-8.9\\bin\\vipsthumbnail.exe')} ${path.resolve(`server\\images\\${archivo}\\original.jpg --smartcrop centre -s 128`)}`)
}

module.exports = {
  crearThumbnail
}