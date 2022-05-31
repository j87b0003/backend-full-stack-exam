const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/middlewares')
const response = require('../tools/response')

/**
 * POST Email sign up
 * @params email: string
 * @params password: string
 */
router.post('/email/signup',
    middlewares.auth.valid.field.login,
    middlewares.auth.data.format,
    middlewares.auth.valid.data.email.signup,
    middlewares.auth.get.accessToken,
    async (req, resp) => {
        response.success(resp, {
            info: {
                accessToken: req.passData.accessToken
            } 
        })
    }
)

/**
 * POST Email login
 * @params email: string
 * @params password: string
 */
router.post('/email/login',
    middlewares.auth.valid.field.login,
    middlewares.auth.data.format,
    middlewares.auth.valid.data.email.login,
    middlewares.auth.get.accessToken,
    async (req, resp) => {
        response.success(resp, {
            info: {
                accessToken: req.passData.accessToken
            } 
        })
    }
)

module.exports = router