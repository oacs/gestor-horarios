"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    index_1.db.get('select * from materia', function (err, row) {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
module.exports = router;
//# sourceMappingURL=materia.js.map