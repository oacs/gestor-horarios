"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
exports.app = express();
exports.sqlite3 = require('sqlite3').verbose();
exports.db = new exports.sqlite3.Database('./database.db');
var materias = require("./rutas/materia");
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data
function init() {
    exports.app.use(bodyParser.json()); // for parsing application/json
    exports.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
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
    exports.app.use('/materias', materias);
    exports.app.listen(3000, function () {
    });
}
exports.init = init;
//# sourceMappingURL=index.js.map