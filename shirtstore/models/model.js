const pool = require('../config/dbConfig')
const Shirt = require('./shirt')

class Model {
    static viewAllShirt(cb) {
        const query = `SELECT * FROM "shirts" ORDER BY "id"`
        pool.query(query, (err, res) => {
            if (err) {
                cb(err, null)
            } else {
                const result = res.rows.map( shirt => {
                    return new Shirt(shirt)
                })
                cb(null, result)
            }
        })
    }

    static sendShirtToDb(shirt, cb) {
        const error = Model.checkValidation(shirt)
        if (error) {
            cb(null, error)
        } else {
            const query = `INSERT INTO "shirts" ("name", "type", "size", "stock") VALUES ($1, $2, $3, $4)`
            const values = [shirt.name, shirt.type, shirt.size, shirt.stock]

            pool.query(query, values, (err, res) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, null)
                }
            })
        }
    }

    static getShirtFromDb(id, cb) {
        const query = `SELECT * FROM "shirts" WHERE "id" = $1`
        const values = [id]
        
        pool.query(query, values, (err, res) => {
            if (err) {
                cb(err, null, null)
            } else {
                if (!res.rows[0]) {
                    cb(null, true, null)
                } else {
                    cb(null, null, new Shirt(res.rows[0])) // Kirim data
                }
            }
        })
    }

    static updateShirtToDb(shirt, id, cb) {
        const error = Model.checkValidation(shirt)
        if (error) {
            cb(null, error)
        } else {
            const query = `UPDATE "shirts" SET "name" = $1, "type" = $2, "size" = $3, "stock" = $4 WHERE "id" = $5`
            const values = [shirt.name, shirt.type, shirt.size, shirt.stock, id]
            pool.query(query, values, (err, res) => {
                if (err) {
                    cb(err, null)
                } else {
                    cb(null, null)
                }
            })
        }
    }

    static checkValidation(shirt) {
        let result = []

        // Name Validation
        if (!shirt.name) result.push(`Name is Required`)
        if (shirt.name.length < 2) result.push(`Name must have minimal 2 words`)

        // Type Validation
        if (!shirt.type) result.push(`Type is Required`)

        // Size Validation
        if (!shirt.size) result.push(`Size is Required`)

        // Stock Validation
        if (!shirt.stock) result.push(`Stock is Required`)
        if (shirt.stock > 100 || shirt.stock < 0) result.push(`Stock must be between minimal 0 to 100`)
        
        result = result.join(', ')

        return result
    }

    static deleteShirtById(id, cb) {
        const queryCheck = `SELECT "stock" FROM "shirts" WHERE "id" = $1`
        const valuesCheck = [id]
        pool.query(queryCheck, valuesCheck, (err, res) => {
            if (err) {
                cb(err, null, null)
            } else {
                const error = Model.checkShirtStock(res.rows[0].stock)
                if (error) {
                    cb(null, error, null)
                } else {
                    const query = `DELETE FROM "shirts" WHERE "id" = $1`
                    const values = [id]

                    pool.query(query, values, (err, res) => {
                        if (err) {
                            cb(err, null, null)
                        } else {
                            if (res.rowCount > 0) {
                                cb(null, null, null) // Success Delete
                            } else {
                                cb(null, null, true) // Not Found
                            }
                        }
                    })
                }
            }
        })
    }

    static checkShirtStock(stock) {
        if (stock > 0) return true
        if (stock == 0) return false
    }
}

module.exports = Model