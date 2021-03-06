const jwt = require('jsonwebtoken')
const moment = require('moment')

const SERVICE_TOKEN = `ACBED0D621782945E8DD1B06EE569340`
module.exports = token = {
    sign: (data, key) => {
        return jwt.sign(data, key)
    },
    signForUser: (user) => {
        const data = JSON.stringify({
            userId: user.id,
            expire: moment().add(1, 'months').valueOf()
        })

        return token.sign(data, SERVICE_TOKEN)
    },
    verify: (token, key) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, key, (err, decode) => {
                if (err) {
                    reject(err)
                }
                resolve(decode)
            })
        })
    },
    verifyForUser: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, SERVICE_TOKEN, (err, decode) => {
                if (err) {
                    reject(err)
                }
                resolve(decode)
            })
        })
    }
}
