const express = require('express')
const moment = require('moment')
const router = express.Router()
const User = require('../models/user')
const middlewares = require('../middlewares/middlewares')
const response = require('../tools/response')
const type = require('../tools/type')

/**
 * POST Email sign up
 * @data email: string
 * @data password: string
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
 * @data email: string
 * @data password: string
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

/**
 * GET Email verify
 * @params id: string
 * @params verifyToken: string
 */
router.get('/email/verify/:id/:verifyToken',
    async (req, resp) => {
        let obj = req.params

        resp.set('Content-Type', 'text/html')
        User.searchByObject(obj).then(doc => {

            if (type.not.undef(doc)) {

                User.updateById(obj.id, { verify: true, updatedTime: moment().format() }).then(() => {

                    resp.redirect('https://frontend-full-stack-exam.web.app/pages/confirmEmail')

                }).catch(err => {
                    resp.redirect('https://frontend-full-stack-exam.web.app/pages/error')
                })

            } else {
                resp.redirect('https://frontend-full-stack-exam.web.app/pages/error')
            }

        }).catch(err => {
            resp.redirect('https://frontend-full-stack-exam.web.app/pages/error')
        })
    }
)


/**
 * POST OAuth
 * @data provider: string
 * @data name: string
 * @data email: string
 */
router.post('/OAuth',
    middlewares.auth.valid.field.oauth,
    middlewares.auth.get.oauth,
    middlewares.auth.get.accessToken,
    async (req, resp) => {
        let info = req.passData.user
        info.accessToken = req.passData.accessToken

        response.success(resp, {
            info: info
        })
    }
)

module.exports = router