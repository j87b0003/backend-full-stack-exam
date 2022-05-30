const _resp = require('./response')
const _joi = require('joi')

module.exports = valid = {
    schema: (schema, data, resp, next) => {
        const res = _joi.validate(data, schema, {
            abortEarly: false
        })
        if (res.error !== null) {
            let msg = '';
            let errors = [];
            res.error.details.forEach((obj, i) => {
                if (i !== 0) msg += ', '
                msg += obj.message
                errors.push(valid.errors(obj))
            })
            _resp.validationError(resp, msg, errors)
        } else {
            next()
            return
        }
    },
    data: (schema, req, resp, next) => {
        valid.schema(schema, req.body, resp, next)
    }
}