
const express = require('express');
export const app = express();
export const sqlite3 = require('sqlite3').verbose();
export const db = new sqlite3.Database('./database.db');

export function init() {
    // Add headers
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);

        // Pass to next layer of middleware
        next();
    });
    app.get('/', function (req, res) {
        db.get('select * from materia', (err, row) => {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    });

    app.listen(3000, function () {
    });
}
