const User = require('../models/user')
const response = require('../tools/response')
const type = require('../tools/type')

module.exports = middlewares = {
    init: async (req, resp, next) => {
        req.passData = {}
        next()
    },
    auth: require('./auth'),
    user: require('./user')
}