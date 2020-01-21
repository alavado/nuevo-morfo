const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const cors = require('cors')
app.use(cors())

mongoose.connect(require('./secret').mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection
  .once('open', () => console.log('Connected to MongoLab instance.'))
  .on('error', error => console.log('Error connecting to MongoLab:', error))

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/foto/:z/:x/:y', (req, res) => {
  const { x, y, z } = req.params
  res.sendFile(path.join(__dirname, `images/IMG_0688/pyramid/${z}/${y}/${x}.jpg`))
})

app.use(require('./services/auth'))

const ip = require('ip').address()
if (ip === '45.55.54.91') {
  const https = require('https')
  const fs = require('fs')
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/compsci.cl-0001/fullchain.pem')
  }
  https.createServer(options, app).listen(1027, () => {
    console.log('Escuchando puerto (HTTPS):', 1027)
  })
}
else {
  console.log(`No estoy en el servidor (IP: ${ip})`);
  app.listen(1027, () => {
    console.log('Escuchando puerto:', 1027)
  })
}
