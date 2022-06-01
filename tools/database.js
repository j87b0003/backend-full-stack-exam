const { Client } = require('pg')

module.exports = database = {
    init: () => {
        const pg = database.pg()

        // init table Users
        pg.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL NOT NULL,
                email TEXT NOT NULL,
                password TEXT,
                name TEXT,
                verify BOOLEAN NOT NULL DEFAULT false,
                verifyToken TEXT,
                googleAccessToken TEXT,
                facebookAccessToken TEXT,
                createdTime TIMESTAMP DEFAULT NOW(),
                updatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                UNIQUE (email)
            )`)

        // init table Login User
        pg.query(`
        CREATE TABLE IF NOT EXISTS loginUser (
            id SERIAL NOT NULL,
            userId TEXT NOT NULL,
            accessToken TEXT NOT NULL,
            loginTime TIMESTAMP DEFAULT NOW(),

            PRIMARY KEY (id)
        )`)

    },
    pg: () => {
        const client = new Client({
            connectionString: process.env.HEROKU_POSTGRESQL_IVORY_URL || 'postgresql://localhost:5432/backend-exam',
            ssl: (process.env.HEROKU_POSTGRESQL_IVORY_URL) ? { rejectUnauthorized: false } : false
        })
        client.connect()

        return client
    }
}