import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from materia', (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.get('/:id', function (req, res) {

    db.get('select * from materia where id = ' + req.params.id, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.get('/getBy', function (req, res) {
    let query = 'select * from materia where '
    let vars = {id: 0 , nombre: ''}
    if(req.params.id){
        query+= ' id = $id'
        vars.id = req.params.id
    }
    if(req.params.nombre){
        query+= ' nombre = $nombre',
        vars.nombre = req.params.nombre
    }
    if(query != 'select * from materia where')
    db.get(query,vars, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.delete('/:id', function (req, res) {

    db.get('delete from materia where id = ' + req.params.id, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    let query = 'update materia set '
    if (req.body.nombre) query+= ' nombre = '+req.body.nombre

    query+= ' where id = $id'
    if(query != 'update materia set  where id = $id')
    if (req.body.nombre) {
        db.run(query, {
            $id: req.params.id,
        }, info => {
            console.log(info);
            res.send(info);
        });
    }
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.post('/', function (req, res) {

    // console.log(req.body);
    db.run('insert into materia( nombre)  values ( $nombre)', {
        $nombre: req.body.nombre
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;
