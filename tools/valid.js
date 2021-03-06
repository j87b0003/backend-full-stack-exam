const response = require('./response')
const type = require('./type')

module.exports = valid = {
    schema: (schema, data, resp, next) => {
        const res = schema.validate(data)

        if (type.not.undef(res.error)) {
            let msg = ''
            let errors = []

            res.error.details.forEach((obj, i) => {
                if (i !== 0) msg += ', '
                msg += obj.message
                errors.push(valid.errors(obj))
            })

            response.fieldValidationError(resp, msg, errors)
        } else {
            next()
        }
    },
    data: (schema, req, resp, next) => {
        valid.schema(schema, req.body, resp, next)
    },
    header: (schema, req, resp, next) => {
        const res = schema.validate(req.headers)

        if (type.not.undef(res.error)) {
            let msg = ''
            let errors = []

            res.error.details.forEach((obj, i) => {
                errors.push(valid.errors(obj))
            })

            response.fieldValidationError(resp, msg, [])
        } else {
            req.passData = {}
            next()
        }
    },
    errors: (err) => {
        let e = {
            key: err.context.key,
            val: err.context.value
        }
        switch (err.type) {
            case 'any.required':
                e.type = 'required'
                break
            case 'string.regex.base':
                e.type = 'regex'
                break
            case 'boolean.base':
                e.type = 'type'
                break
        }
        return e
    }
}