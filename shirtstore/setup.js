const pool = require('./config/dbConfig')

const query = `CREATE TABLE "shirts" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(50) NOT NULL,
    "type" VARCHAR(25) NOT NULL,
    "size" VARCHAR(2) NOT NULL,
    "stock" INTEGER NOT NULL
)`

pool.query(query, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Success Create Table "shirts" INTO Database "p1-livecode-w3"`);
        pool.end()
    }
})