const joi = require('joi')
const crypto = require('crypto')
const moment = require('moment')
const User = require('../models/user')
const LoginUser = require('../models/loginUser')
const response = require('../tools/response')
const type = require('../tools/type')
const valid = require('../tools/valid')

const PASSWORD_RULE = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}/

module.exports = middlewares = {
    auth: require('./auth'),
    data: {
        format: async (req, resp, next) => {
            let data = req.body.data

            if (type.not.undef(data.oldPassword)) {
                data.oldPassword = crypto.createHash('sha256').update(data.oldPassword).digest('hex')
            }

            if (type.not.undef(data.password)) {
                data.password = crypto.createHash('sha256').update(data.password).digest('hex')
            }

            req.body.data = data
            next()
        },
        get: async (req, resp, next) => {
            const userId = req.passData.userId

            User.getById(userId).then(doc => {

                if (type.not.undef(doc)) {
                    User.updateById(userId, { updatedTime: moment().format() }).then(() => { }).catch(() => { })

                    LoginUser.getLoginCountById(userId).then(count => {
                        req.passData.user = doc
                        req.passData.user.loginCount = count || 0
                        
                        next()
                    }).catch(err => {
                        response.err(resp, err)
                    })
                } else {
                    response.dataValidationError(resp, 'User is not exists.')
                }
            }).catch(err => {
                response.err(resp, err)
            })
        }
    },
    valid: {
        field: {
            resetPassword: async (req, resp, next) => {
                const schema = joi.object().keys({
                    data: joi.object().keys({
                        oldPassword: joi.string().required(),
                        password: joi.string().regex(PASSWORD_RULE).required()
                    }).required()
                })

                valid.data(schema, req, resp, next)
            }
        },
        data: {
            oldPassword: async (req, resp, next) => {
                const data = req.body.data

                User.searchByObject({
                    id: req.passData.userId,
                    password: data.oldPassword
                }).then(doc => {

                    if (type.not.undef(doc)) {
                        req.passData.user = doc
                        next()
                    } else {
                        response.dataValidationError(resp, `Old password incorrect.`)
                    }

                }).catch(err => {
                    response.err(resp, err)
                })
            }
        }
    }
}