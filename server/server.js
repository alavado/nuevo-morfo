const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const models = require('./models')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
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

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.get('/foto/:id/:z/:x/:y', (req, res) => {
  const { id, x, y, z } = req.params
  res.sendFile(path.join(__dirname, `images/${id}/pyramid/${z}/${y}/${x}.jpg`))
})

app.get('/thumbnail/:id', (req, res) => {
  const { id } = req.params
  res.sendFile(path.join(__dirname, `images/${id}/tn_original.jpg`))
})

const formidableMiddleware = require('express-formidable')
app.use(formidableMiddleware())
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
