const _express = require('express')
const _router = _express.Router()
const _middlewares = require('../middlewares/middlewares')

_router.post('/email/signup',
    _middlewares.valid.field.login,
    _middlewares.valid.data.email.signup,
    _middlewares.user.signup,
    async (req, resp) => {
        console.log(1234)
    }
)

_router.post('/email/login',
    _middlewares.valid.field.login,
    _middlewares.valid.data.email.login,
    async (req, resp) => {
        console.log(123)
    }
)

module.exports = _router