const express = require('express')
const app = express()
const Usuario = require('../models/usuario')
const https = require('https')
const APP_NAME = 'morfo'
const CONTENT_PROVIDER_URL = 'https://www.u-cursos.cl/upasaporte/?'
const REDIRECT_URL = 'https://nuevo-morfo.netlify.com/'
const MENSAJE_ERROR = 'Surgió un error finalizando la autenticación. Si el problema persiste, contáctese a soporte.'

app.post('/auth', (req, res) => {
  if (!req.body.ticket) {
    res.status(400).end()
    return
  }
  const url = `${CONTENT_PROVIDER_URL}servicio=${APP_NAME}&ticket=${req.body.ticket}`
  https.get(url, r => {
    let data = ''
    r.on('data', d => data += d)
    r.on('end', () => {
      console.log(`data: ${JSON.stringify(JSON.parse(data))}`)
      if (r.statusCode != 200) {
        res.status(500).send(MENSAJE_ERROR)
        return
      }
      Usuario
        .loginUcampus('alejandro.lvd@gmail.com')
        .then(d => res.send(`${REDIRECT_URL}?token=${d}`))
        .catch(err => res.send('Error en la autenticacion'))
    })
    r.on('error', () => res.status(500).send(MENSAJE_ERROR))
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
