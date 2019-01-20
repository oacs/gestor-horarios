"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    index_1.db.all('select * from materia', function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
router.get('/:id', function (req, res) {
    index_1.db.get('select * from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
router.get('/getBy', function (req, res) {
    var query = 'select * from materia where ';
    if (req.params.id)
        query += ' id =' + req.params.id + ',';
    if (req.params.nombre)
        query += ' nombre =' + req.params.nombre + ',';
    query = query.substr(0, query.length - 1);
    if (query != 'select * from materia where')
        index_1.db.get(query, function (err, row) {
            console.log(err);
            // console.log(row);
            res.send(row);
        });
    res.status(400).send('error parametros no valido: enum[nombre,id]');
});
router.delete('/:id', function (req, res) {
    index_1.db.get('delete from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
router.put('/:id', function (req, res) {
    var query = 'update materia set ';
    if (req.body.nombre)
        query += ' nombre = ' + req.body.nombre;
    query += ' where id = $id';
    if (query != 'update materia set  where id = $id')
        if (req.body.nombre) {
            index_1.db.run(query, {
                $id: req.params.id,
            }, function (info) {
                console.log(info);
                res.send(info);
            });
        }
    res.status(400).send('error parametros no valido: enum[nombre,id]');
});
router.post('/', function (req, res) {
    // console.log(req.body);
    index_1.db.run('insert into materia( nombre)  values ( $nombre)', {
        $nombre: req.body.nombre
    }, function (info) {
        console.log(info);
        res.send(info);
    });
});
module.exports = router;
//# sourceMappingURL=materia.js.map