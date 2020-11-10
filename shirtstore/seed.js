const pool = require('./config/dbConfig')
const fs = require('fs')

fs.readFile('./shirts.json', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.log(err)
    } else {
        let result = []
        data = JSON.parse(data)
        data.forEach( shirt => {
            result.push(`('${shirt.name}', '${shirt.type}', '${shirt.size}', ${shirt.stock})`)
        })
        result = result.join(', ')
        // Seed to Table "shirts"
        const query = `INSERT INTO "shirts" ("name", "type", "size", "stock") VALUES ${result}`
        pool.query(query, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Success Seed from shirts.json INTO Table "shirts"`);
                pool.end()
            }
        })
    }
})