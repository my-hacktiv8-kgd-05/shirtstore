const { Pool } = require('pg')
const config = {
    user: 'postgres',
    host: '127.0.0.1',
    database: 'p1-livecode-w3',
    password: 'db',
    port: 5432,
}

const pool = new Pool(config)

module.exports = pool