"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var express_1 = require("express");
var router = express_1.Router();
/** Obtengo todos los registros
 *
 */
router.get('/', function (req, res) {
    index_1.db.all('select * from materia', function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
/**Obtengo un registro dado su id
 *
 */
router.get('/:id', function (req, res) {
    index_1.db.get('select * from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
/**Obtengo un registro dado un parametro
 * @param id int
 * @param nombre text
 * @return Materia[]
 *
 */
router.get('/getBy', function (req, res) {
    var query = 'select * from materia where ';
    var vars = { id: 0, nombre: '' };
    if (req.params.id) {
        query += ' id = $id';
        vars.id = req.params.id;
    }
    if (req.params.nombre) {
        query += ' nombre = $nombre',
            vars.nombre = req.params.nombre;
    }
    if (query !== 'select * from materia where') {
        index_1.db.get(query, vars, function (err, row) {
            console.log(err);
            // console.log(row);
            res.send(row);
        });
    }
    res.status(400).send('error parametros no valido: enum[nombre,id]');
});
/**Elimino un registro dado su id
 * @param id int
 */
router.delete('/:id', function (req, res) {
    index_1.db.get('delete from materia where id = ' + req.params.id, function (err, row) {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
/** Actualizo un registro dado un id
 * @param id int
 * @body nombre text
 */
router.put('/:id', function (req, res) {
    var query = '';
    if (req.body.nombre) {
        query += 'update materia set nombre = $nombre where id = $id';
        index_1.db.run(query, { $id: req.params.id, $nombre: req.body.nombre }, function (info) {
            console.log(info);
            res.send(info);
        });
    }
    else {
        res.status(400).send('error parametros no valido: enum[nombre,id]');
    }
});
/** Guardo un registro dado un id
 * @body nombre text
 */
router.post('/', function (req, res) {
    // console.log(req.body);
    index_1.db.run('insert into materia( nombre)  values ( $nombre)', {
        $nombre: req.body.nombre
    }, function (info) {
        console.log(info);
        index_1.db.get('select id from materia order by id desc limit 1', function (err, row) {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    });
});
module.exports = router;
//# sourceMappingURL=materia.js.map