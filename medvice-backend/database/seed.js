const fs = require('fs')
const {Pool} = require('pg')

require("dotenv").config()
const databaseUrl = process.env.POSTGRES_URI;
const pool = new Pool({connectionString: databaseUrl})
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
    console.log('Seeding the database...');
    const files = fs.readdirSync(path.join(__dirname, '..', '/data/'));

    files.forEach(file => {
        if (file.endsWith('.sql')) {
            console.log("Seeding", file);
            const seedQuery = fs.readFileSync(path.join(__dirname, '..', '/data/', file), {encoding: 'utf8'})
            pool.query(seedQuery, (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Seeded", file);
                }
            });
        }
    });

    pool.end();
}