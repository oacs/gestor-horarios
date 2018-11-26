import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from pensum', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.get('/:id', function (req, res) {

    db.get('select * from pensum where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.delete('/:id', function (req, res) {

    db.get('delete from pensum where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    if (req.body.fecha) {
        db.run('UPDATE pensum SET fecha = $fecha WHERE id = $id', {
            $id: req.params.id,
            $fecha: req.body.fecha
        }, info => {
            console.log(info);
            res.send(info);
        });
    }
});

router.post('/', function (req, res) {

    console.log(req.body);
    db.run('insert into pensum(fecha)  values ($fecha)', {
        $fecha: req.body.fecha
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;
