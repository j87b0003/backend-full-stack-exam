const { Client } = require('pg')

module.exports = database = {
    init: () => {
        const pg = database.pg()

        // init table Users
        pg.query(`
            DROP TYPE IF EXISTS oauth_type;
            CREATE TYPE oauth_type AS ENUM ('email', 'google', 'facebook');
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL NOT NULL,
                email TEXT NOT NULL,
                password TEXT,
                name TEXT,
                authType oauth_type NOT NULL DEFAULT 'email',
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
            connectionString: process.env.HEROKU_POSTGRESQL_IVORY_URL || 'postgresql://postgres:@localhost:5432/backend-exam',
            ssl: process.env.HEROKU_POSTGRESQL_IVORY_URL ? true : false
        })
        client.connect()

        return client
    }
}