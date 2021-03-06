const database = require('../tools/database')

const field = `id, email, name, verify, verifyToken, createdTime, updatedTime`

module.exports = user = {
    getAll: () => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`SELECT ` + field + ` FROM users ORDER BY id ASC`, (err, results) => {
                pg.end()

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
            pg.query(`SELECT ` + field + ` FROM users WHERE id = $1`,
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
            pg.query(`SELECT ` + field + ` FROM users WHERE email = $1`,
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
            pg.query(`SELECT ` + field + ` FROM users WHERE email = $1 AND password = $2`,
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
    getTotalOfActiveSession: (day = 0) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`SELECT * FROM users WHERE updatedtime > (CURRENT_DATE - CAST($1 AS INTEGER))`,
                [day],
                (err, results) => {
                    pg.end()

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows)
                    }
                })

        })
    },
    create: (data) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`INSERT INTO users (email, password, verifyToken) VALUES ($1, $2, $3) RETURNING ` + field,
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
    },
    updateById: (id, obj) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()

            let data = ``
            Object.entries(obj).forEach(([key, value], index) => {
                if (index > 0) {
                    data += `,`
                }
                data += ` ` + key + ` = '` + value + `'`
            })

            pg.query(`UPDATE users SET ` + data + ` WHERE id = $1 RETURNING ` + field,
                [id],
                (err, results) => {
                    pg.end()

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                }
            )

        })
    },
    searchByObject: (obj) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()

            let where = ``
            Object.entries(obj).forEach(([key, value], index) => {
                if (index > 0) {
                    where += ` AND`
                }
                where += ` ` + key + ` = '` + value + `'`
            })
            where += ` LIMIT 1`

            pg.query(`SELECT * FROM users WHERE` + where,
                (err, results) => {
                    pg.end()

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                }
            )

        })
    },
    conflictByOAuth: (obj) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            let accessTokenField = ''

            switch (obj.provider.toLowerCase()) {
                case 'facebook':
                    accessTokenField = 'facebookAccessToken'
                    break
                default:
                    accessTokenField = 'googleAccessToken'
            }

            pg.query(`INSERT INTO users (` + accessTokenField + `, name, email, verify) VALUES ($1, $2, $3, true)
                        ON CONFLICT (email) DO UPDATE 
                        SET ` + accessTokenField + ` = excluded.` + accessTokenField + `,
                            name = excluded.name,
                            verify = true
                        RETURNING ` + field,
                [obj.accessToken, obj.name, obj.email],
                (err, results) => {
                    pg.end()

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows[0])
                    }
                }
            )

        })
    }
}