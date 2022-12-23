const express = require('express')
require('dotenv').config()

// Crear el servidor de express
const app = express()

// Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use( express.json())

//Rutas
app.use('/api/auth',require('./routes/auth'))
// TODO: auth // crear, login, renew
// TODO: CRUD Eventos

app.listen(process.env.PORT, () =>{
    console.log( 'servidor corriendo');
})