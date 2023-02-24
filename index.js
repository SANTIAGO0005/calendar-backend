const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { dbConnection } = require('./database/config')



// Crear el servidor de express
const app = express()

// DATEBASE
dbConnection()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// CORS
app.use(cors())
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