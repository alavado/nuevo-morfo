const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/foto/:z/:x/:y', (req, res) => {
  const { x, y, z } = req.params
  res.sendFile(path.join(__dirname, `images/parque_croacia/pyramid/${z}/${y}/${x}.jpg`))
})

// app.use(require('./services/auth'))
 
app.listen(1027)