const database = require('../tools/database')

module.exports = loginUser = {
    create: (id, accessToken) => {
        return new Promise((resolve, reject) => {

            const pg = database.pg()
            pg.query(`INSERT INTO loginUser (userId, accessToken) VALUES ($1, $2) RETURNING id`,
                [id, accessToken],
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