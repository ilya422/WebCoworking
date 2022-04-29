const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: "ilia2001",
    host: "localhost",
    port: 5432,
    database: "WebCoworking"
})
module.exports = pool