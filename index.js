const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')



// Crear el servidor de express
const app = express()

// DATEBASE
dbConnection()

// CORS
const whitelist = ['https://calendar-backend-gamma.vercel.app','http://calendar-backend-santiago0005.vercel.app']
app.use(cors({origin: whitelist}))
// Directorio publico
app.use(express.static('public'))

//Lectura y parseo del body
app.use( express.json())

//Rutas
app.use('/api/auth',require('./routes/auth'))
app.use('/api/events',require('./routes/events'))

// TODO: auth // crear, login, renew
// TODO: CRUD Eventos

app.listen(process.env.PORT_DEPLOY, () =>{
    console.log( 'servidor corriendo');
})