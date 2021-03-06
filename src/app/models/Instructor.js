const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`SELECT * FROM instructors`, function (err, results) {
            if(err) return res.send("Database Error!")

            callback(results.rows)
        })

    },
    create(data, callback) {

        const keys = Object.keys(req.body)
        for (key of keys) {
            // req.body.key == ""
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        const query = `
            INSERT INTO instructors (
                name,
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso
        ]
        db.query(query, values, function(err, results) {
            if(err) return res.send("Database Error!")

            callback(results.rows[0])

        })
    },
    find(id, callback) {
        db.query(`
        SELECT *
        FROM instructors
        WHERE id = $1`, [id], function(err, results) {
            if(err) return res.send("Database Error!")
            callback(results.rows[0])
        })
    }

}