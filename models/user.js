const _database = require('../tools/database')
const _crypto = require('crypto')

module.exports = user = {
    getAll: () => {
        return new Promise((resolve, reject) => {

            const pg = _database.pg()
            pg.query(`SELECT id, email FROM users ORDER BY id ASC`, (err, results) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(results.rows)
                }
            })

        })
    },
    getById: (id) => {
        return new Promise((resolve, reject) => {

            const pg = _database.pg()
            pg.query(`SELECT * FROM users WHERE id = $1`,
                [id],
                (err, results) => {
                    pg.end()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                })

        })
    },
    getByEmail: (email) => {
        return new Promise((resolve, reject) => {

            const pg = _database.pg()
            pg.query(`SELECT * FROM users WHERE email = $1`,
                [email],
                (err, results) => {
                    pg.end()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                })

        })
    },
    getByLogin: (data) => {
        return new Promise((resolve, reject) => {

            const pg = _database.pg()
            pg.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,
                [data.email, user.crypto(data.password)],
                (err, results) => {
                    pg.end()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                })

        })
    },
    create: (data) => {
        return new Promise((resolve, reject) => {

            const pg = _database.pg()
            pg.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id`,
                [data.email, user.crypto(data.password)],
                (err, results) => {
                    pg.end()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                })

        })
    },
    crypto: (password) => {
        return _crypto.createHash('sha256').update(password).digest('hex')
    }
}