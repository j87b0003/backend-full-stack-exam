const User = require('../models/user')
const response = require('../tools/response')
const type = require('../tools/type')

module.exports = middlewares = {
    auth: require('./auth'),
    data: {
        get: async (req, resp, next) => {
            const id = req.pass.id

            User.getById(id).then(doc => {

                if (type.not.undef(doc)) {
                    req.passData.user = doc

                    next()
                } else {
                    response.dataValidationError(resp, 'User is not exists.')
                }
            }).catch(err => {
                response.err(resp, err)
            })
        }
    }
}