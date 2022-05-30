const _valid = require('../tools/valid')
const _joi = require('joi')
_joi.objectId = require('joi-objectid')(_joi)
const _dotEnv = require("dotenv")
_dotEnv.config()

const _token = require('../tools/token')
const _resp = require('../tools/response')

module.exports = middlewares = {
    valid: {
        email: {
            login: async (req, resp, next) => {
                const schema = _joi.object().keys({
                    email: _joi.string().required(),
                    password: _joi.string().regex(/^\d+$/).required(),
                }).required()
                
                _valid.data(schema, req, resp, next)
            },
            resetPassword: async (req, resp, next) => {

            }
        }
    }
}