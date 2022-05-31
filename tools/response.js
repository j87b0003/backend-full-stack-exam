const type = require('./type')

module.exports = res = {
    success: (resp, data) => {
        res.send(resp, {
            code: 200,
            data: data
        })
    },
    err: (resp, msg) => {
        res.send(resp, {
            code: 407,
            msg: res.msg('Exception Fail', msg)
        })
    },
    noResult: (resp) => {
        res.send(resp, {
            code: 404
        })
    },
    fieldValidationError: (resp, msg, errors) => {
        res.send(resp, {
            code: 451,
            msg: res.msg('Field Validation Error', msg),
            errors: errors
        })
    },
    dataValidationError: (resp, msg, type) => {
        res.send(resp, {
            code: 451,
            msg: res.msg('Data Validation Error', msg),
            type: type
        })
    },
    err: (resp, err) => {
        res.send(resp, {
            code: 407,
            msg: err
        })
    },
    msg: (title, msg) => {
        if (msg) {
            if (type.not.str(msg)) {
                msg = msg.toString()
            }
            title += ': ' + msg
        }
        return title
    },
    send: (resp, data) => {
        resp.json(data)
    }
}