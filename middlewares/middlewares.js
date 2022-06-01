const joi = require('joi')
const token = require('../tools/token')
const valid = require('../tools/valid')
const response = require('../tools/response')

module.exports = middlewares = {
    init: async (req, resp, next) => {
        req.passData = {}
        next()
    },
    valid: {
        field: {
            token: async (req, resp, next) => {
                const schema = joi.object().keys({
                    'access-token': joi.string().required()
                }).unknown(true)

                valid.header(schema, req, resp, next)
            },
        }
    },
    verifyAccessToken: async (req, resp, next) => {
        token.verifyForUser(req.headers['access-token']).then(decode => {
            if (decode.userId) {
                req.passData.userId = decode.userId

                next()
            } else {
                response.noResult(resp)
            }
        }).catch(err => {
            response.err(resp, err, `Access Token can't decode.`)
        })
    },
    auth: require('./auth'),
    user: require('./user')
}