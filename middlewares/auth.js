const joi = require('joi')
const crypto = require('crypto')
const User = require('../models/user')
const LoginUser = require('../models/loginuser')
const response = require('../tools/response')
const valid = require('../tools/valid')
const type = require('../tools/type')
const token = require('../tools/token')

const PASSWORD_RULE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/

module.exports = middlewares = {
    data: {
        format: async (req, resp, next) => {
            let data = req.body.data

            if (type.not.undef(data.email)) {
                data.email = data.email.toLowerCase().trim()
            }

            if (type.not.undef(data.password)) {
                data.password = crypto.createHash('sha256').update(data.password).digest('hex')
            }

            req.body.data = data
            next()
        }
    },
    valid: {
        field: {
            login: async (req, resp, next) => {
                const schema = joi.object().keys({
                    data: joi.object().keys({
                        email: joi.string().email().trim().required(),
                        password: joi.string().regex(PASSWORD_RULE).required()
                    }).required()
                })

                valid.data(schema, req, resp, next)
            },
            resetPassword: async (req, resp, next) => {
                const schema = joi.object().keys({
                    data: joi.object().keys({
                        oldPassword: joi.string().required(),
                        newPassword: joi.string().regex(PASSWORD_RULE).required(),
                        reenterPassowrd: joi.string().required()
                    }).required()
                })

                valid.data(schema, req, resp, next)
            }
        },
        data: {
            email: {
                signup: async (req, resp, next) => {
                    const data = req.body.data

                    User.getByEmail(data.email).then(doc => {

                        if (type.is.undef(doc)) {
                            User.create(data).then(doc1 => {
                                req.passData.user = doc1
                                next()
                            }).catch(err => {
                                response.err(resp, err)
                            })
                        } else {
                            response.dataValidationError(resp, 'Email is exists.')
                        }

                    }).catch(err => {
                        response.err(resp, err)
                    })

                },
                login: async (req, resp, next) => {
                    const data = req.body.data

                    User.getByLogin(data).then(doc => {

                        if (type.not.undef(doc)) {
                            req.passData.user = doc
                            next()
                        } else {
                            response.dataValidationError(resp, 'Email is not exists or password incorrect.')
                        }

                    }).catch(err => {
                        response.err(resp, err)
                    })
                }
            }
        }
    },
    get: {
        accessToken: async (req, resp, next) => {
            const user = req.passData.user
            const accessToken = token.signForUser(user)

            LoginUser.create(user.id, accessToken).then(() =>{
                req.passData.accessToken = accessToken
                next()
            }).catch(err => {
                response.err(resp, err)
            })

        }
    }
}