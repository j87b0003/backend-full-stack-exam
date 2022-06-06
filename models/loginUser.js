const type = require('../tools/type')
const database = require('../tools/database')

module.exports = loginUser = {
    getLoginCountById: (userId) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`SELECT * FROM loginUser WHERE userId = $1`,
                [userId],
                (err, results) => {
                    pg.end()

                    if (err) {
                        reject(err)
                    } else {
                        resolve(results.rows.length)
                    }
                })

        })

    },
    create: (userId, accessToken) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`INSERT INTO loginUser (userId, accessToken) VALUES ($1, $2) RETURNING id`,
                [userId, accessToken],
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