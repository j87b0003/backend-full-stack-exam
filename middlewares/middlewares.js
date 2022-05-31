const _joi = require('joi')
const User = require('../models/user')
const _resp = require('../tools/response')
const _valid = require('../tools/valid')
const _type = require('../tools/type')

module.exports = middlewares = {
    init: async (req, resp, next) => {
        req.passData = {}
        next()
    },
    valid: {
        field: {
            login: async (req, resp, next) => {
                const schema = _joi.object().keys({
                    data: _joi.object().keys({
                        email: _joi.string().email().required(),
                        password: _joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/).required()
                    }).required()
                })

                _valid.data(schema, req, resp, next)
            },
            resetPassword: async (req, resp, next) => {

            }
        },
        data: {
            email: {
                signup: async (req, resp, next) => {
                    const data = req.body.data

                    User.getByEmail(data.email).then(doc => {
                        req.passData.user = doc
                        next()
                    }).catch(err => {
                        console.log(err)
                        _resp.err(resp, err)
                    })
                },
                login: async (req, resp, next) => {

                }
            }
        }
    },
    user: {
        signup: async (req, resp, next) => {
            const data = req.body.data
            const user = req.passData.user

            if (_type.is.undef(user)) {

                User.create(data).then(doc => {
                    console.log(doc)
                    next()
                }).catch(err => {
                    _resp.err(resp, err)
                })
            } else {
                _resp.dataValidationError(resp, 'Email is exists.')
            }
        },
        login: async (req, resp, next) => {

        },
        accessToken: async (req, resp, next) => { 
            
        }
    }
}