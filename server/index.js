"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
exports.app = express();
exports.sqlite3 = require('sqlite3').verbose();
exports.db = new exports.sqlite3.Database('./database.db');
function init() {
    // Add headers
    exports.app.use(function (req, res, next) {
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
    exports.app.get('/', function (req, res) {
        exports.db.get('select * from materia', function (err, row) {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    });
    exports.app.listen(3000, function () {
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map