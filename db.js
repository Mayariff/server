const Pool = require('pg').Pool
const pool = new Pool(
    {
        user: 'postgres',
        password: '19051991',
        host: 'localhost',
        port: 5432,
        database: 'node_test_base'
    }
)

module.exports = pool