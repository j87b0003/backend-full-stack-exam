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

                User.updateById(obj.id, { verify: true, updatedTime: moment().valueOf() }).then(() => {

                    resp.send(`<h2>Your email is confirmed.</h2>`)

                }).catch(err => {

                    resp.send(
                        `<h2>OOOOOOOOPS</h2>` +
                        `<h5>Something is Wrong</h5>` +
                        `<h5>` + err + `</h5>`
                    )
                })

            } else {
                resp.send(`<h2>Your email is NOT confirmed.</h2>`)
            }

        }).catch(err => {
            resp.send(
                `<h2>OOOOOOOOPS</h2>` +
                `<h5>Something is Wrong</h5>` +
                `<h5>` + err + `</h5>`
            )
        })
    }
)
module.exports = router