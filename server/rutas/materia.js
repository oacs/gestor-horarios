"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (req, res) {
    index_1.db.all('select * from materia', function (err, row) {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
router.get('/:id', function (req, res) {
    index_1.db.get('select * from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
router.delete('/:id', function (req, res) {
    index_1.db.get('delete from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
router.put('/:id', function (req, res) {
    if (req.body.nombre) {
        index_1.db.run('UPDATE materia SET nombre = $nombre WHERE id = $id', {
            $id: req.params.id,
            $nombre: req.body.nombre
        }, function (info) {
            console.log(info);
            res.send(info);
        });
    }
    if (req.body.semestre) {
        index_1.db.run('UPDATE materia SET semestre = $semestre WHERE id = $id', {
            $id: req.params.id,
            $semestre: req.body.semestre
        }, function (info) {
            console.log(info);
            res.send(info);
        });
    }
});
router.post('/', function (req, res) {
    console.log(req.body);
    index_1.db.run('insert into materia(id, semestre, nombre)  values ($id, $semestre, $nombre)', {
        $id: req.body.id,
        $semestre: req.body.semestre,
        $nombre: req.body.nombre
    }, function (info) {
        console.log(info);
        res.send(info);
    });
});
module.exports = router;
//# sourceMappingURL=materia.js.map