const { Client } = require('pg')

module.exports = database = {
    init: () => {
        const pg = database.pg()

        // create Users
        pg.query(`
            CREATE EXTENSION IF NOT EXISTS pgcrypto;
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL NOT NULL,
                email TEXT NOT NULL,
                password TEXT,
                loginCount INT NOT NULL DEFAULT 1,
                createdTime TIMESTAMP DEFAULT NOW(),
                updatedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                PRIMARY KEY (id),
                UNIQUE (email)
            )`)


    },
    pg: () => {
        const client = new Client({
            connectionString: process.env.DATABASE_URL || 'postgresql://postgres:@localhost:5432/backend-exam',
            ssl: process.env.DATABASE_URL ? true : false
        })
        client.connect()

        return client
    }
}