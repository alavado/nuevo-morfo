const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'server/uploads/' })
const fs = require('fs')
const { crearThumbnail, crearPiramide } = require('./tiles')
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

const { mongoURI } = require('./secret')
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB Atlas', err))

app.get('/foto/:id/:z/:x/:y', (req, res) => {
  const { id, x, y, z } = req.params
  const imagen = path.join(__dirname, `images/${id}/pyramid/${z}/${y}/${x}.jpg`)
  fs.access(imagen, fs.constants.R_OK, err => {
    if (err) {
      return res.sendFile(path.join(__dirname, 'images/blank.png'))
    }
    res.sendFile(imagen)
  })
})

app.get('/thumbnail/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(path.join(__dirname, `images/${id}/tn_original.jpg`))
})

app.post('/subir_imagen', upload.single('imagen'), (req, res) => {
  const { filename } = req.file
  fs.mkdirSync(`server/images/${filename}`)
  fs.rename(req.file.path, `server/images/${filename}/original.jpg`, err => {
    crearThumbnail(filename)
    crearPiramide(filename)
    if (err) {
      res.status(500).send('Error')
      return
    }
    res.status(200).send(filename)
  })
})

app.post('/subir_imagen_pierna', upload.single('imagen'), (req, res) => {
  const { filename } = req.file
  res.status(200).send(filename)
})

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(require('./services/auth'))
const isDev = require('./helpers/dev').isDev()
if (!isDev) {
  const https = require('https')
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/fullchain.pem')
  }
  https.createServer(options, app).listen(1027, () => {
    console.log('Escuchando puerto (HTTPS):', 1027)
  })
}
else {
  console.log(`No estoy en el servidor (IP: ${require('ip').address()})`)
  app.listen(1027, () => {
    console.log('Escuchando puerto:', 1027)
  })
}
