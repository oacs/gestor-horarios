import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from materia', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.get('/:id', function (req, res) {

    db.get('select * from materia where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.delete('/:id', function (req, res) {

    db.get('delete from materia where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    let query = 'update materia set'
    if (req.body.nombre) {query + ' nombre = ' + req.body.nombre};
    query += ' where id = $id'
    if(query != 'update materia set where id = $id')
        db.run(query, {$id: req.params.id,}, info => {res.send(info);});
    res.status('400').send('none parameter pass');
});

router.post('/', function (req, res) {

    console.log(req.body);
    db.run("insert into materia(id, nombre)  values ($id, $nombre)", {
        $id: req.body.id,
        $nombre: req.body.nombre
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;