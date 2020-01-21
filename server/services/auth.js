const express = require('express')
const app = express()
// const Usuario = require('../models/usuarios')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const _ = require('lodash')

// const { CADUCIDAD_TOKEN, SEED } = require('../config/config')

const https = require('https')
const uid = require('uid-safe').sync
const APP_NAME = 'morfo'
const CONTENT_PROVIDER_URL = 'https://www.u-cursos.cl/upasaporte/?'
const REDIRECT_URL = 'https://nuevo-morfo.netlify.com/'
var SESSION = {}

app.post('/auth', (req, res) => {
  if (!req.fields.ticket) {
    res.statusCode = 400
    res.end()
    return
  }
  console.log({req})
  console.log({res})
  const url = `${CONTENT_PROVIDER_URL}servicio=${APP_NAME}&ticket=${req.fields.ticket}`
  https.get(url, function(r){
    var data = ""
    r.on('data', function(d) {
      data+=d
    })
    r.on('end', function() {
      console.log(`data: ${JSON.stringify(JSON.parse(data))}`)
      if(r.statusCode != 200){
        res.statusCode = 500
        res.send("Surgió un error finalizando la autenticación. Si el problema persiste, contáctese a soporte.")
        return
      }
      data = JSON.parse(data)
      var sess_id = uid(24)
      SESSION[sess_id] = data
			var redirect = REDIRECT_URL+'?sess_id='+sess_id
			res.send(redirect)
    })
    r.on('error', function(){
      res.statusCode = 500
      res.send("Surgió un error finalizando la autenticación. Si el problema persiste, contáctese a soporte.")
    })
  })
})

app.get('/auth', (req, res) => {
  if (!SESSION[req.params.idsesion]) {
    return res.status(400).send('Sesión inválida')
  }
  return res.json(SESSION[req.fields.idsesion])
})

app.get('/usuarioucampus', (req, res) => {
  const { sess_id } = req.query
  if (sess_id && SESSION[sess_id]) {
    res.send(SESSION[sess_id])
  }
})

// app.post('/login', (req, res) => {
//   const {email, password} = req.fields
//   Usuario.findOne({email}, (err, usuario) => {
//     if (err) {
//       return res.status(400).json(err)
//     }
//     if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
//       return res.status(400).json({
//         errors: {
//           login: {
//             message: 'Usuario o contraseña inválido'
//           }
//         }
//       })
//     }
//     const usuarioRes = _.pick(usuario, ['nombre', 'email', 'roles'])
//     const token = jwt.sign({usuarioRes}, SEED, { expiresIn: CADUCIDAD_TOKEN })
//     return setTimeout(() => res.json({usuario: usuarioRes, token}), MSTHROTTLING)
//   })
// })

module.exports = app