const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/middlewares')
const response = require('../tools/response')
const User = require('../models/user')
const email = require('../tools/email')

/**
 * GET User info
 * @header accessToken: string
 */
router.get('/info',
    middlewares.user.data.get,
    async (req, resp) => {
        response.success(resp, {
            info: req.passData.user
        })
    }
)

/**
 * get Send verify email
 * @header accessToken: string
 */
router.get('/sendVerifyEmail',
middlewares.user.data.get,
    async (req, resp) => {
        const user = req.passData.user

        email.verify(user.email, user.id, user.verifyToken)

        response.success(resp, {
            info: user
        })

    }
)

/**
 * POST Reset password
 * @data oldPassword: string
 * @data password: string
 */
router.post('/resetPassword',
    middlewares.user.valid.field.resetPassword,
    middlewares.user.data.format,
    middlewares.user.valid.data.oldPassword,
    async (req, resp) => {
        const data = req.body.data

        User.updateById(
            req.passData.userId,
            {
                password: data.password
            }
        ).then(() => {

            response.success(resp, {
                info: {
                    userId: req.passData.userId
                }
            })

        }).catch(err => {
            response.err(resp, err)
        })
    }
)

module.exports = router