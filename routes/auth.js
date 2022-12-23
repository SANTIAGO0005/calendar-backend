/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router} = require('express')
const router = Router()

const {createUser, loginUsuario, refreshToken} = require('../controllers/auth')

router.post('/new', createUser)

router.post('/',loginUsuario)

router.get('/renew',refreshToken)

module.exports = router