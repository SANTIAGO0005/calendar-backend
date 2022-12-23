const { response} = require('express')


const createUser = (req, res = response) => {

    const { name, email, password} = req.body
    res.json({
        ok: true,
        msg: 'registro',
        name,
        email,
        password
    })
}

const loginUsuario = ( req, res = response) => {
    
    const { email, password} = req.body
    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
}

const refreshToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    createUser,
    loginUsuario,
    refreshToken
}