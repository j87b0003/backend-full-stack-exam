const database = require('../tools/database')

module.exports = user = {
    getAll: () => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
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

            const pg = database.pg()
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

            const pg = database.pg()
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

            const pg = database.pg()
            pg.query(`SELECT * FROM users WHERE email = $1 AND password = $2`,
            [data.email, data.password],
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

            const pg = database.pg()
            pg.query(`INSERT INTO users (email, password, verifyToken) VALUES ($1, $2, $3) RETURNING id, email`,
                [data.email, data.password, data.verifyToken],
                (err, results) => {
                    pg.end()
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                })

        })
    }
}