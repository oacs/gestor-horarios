import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from seccion', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.get('/:id', function (req, res) {

    db.get('select * from seccion where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.delete('/:id', function (req, res) {

    db.get('delete from seccion where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    if (req.body.numero) {
        db.run('UPDATE seccion SET numero = $numero WHERE id = $id', {
            $id: req.params.id,
            $numero: req.body.numero
        }, info => {
            console.log(info);
            res.send(info);
        });
    }

    if (req.body.horario) {
        db.run('UPDATE seccion SET horario = $horario WHERE id = $id', {
            $id: req.params.id,
            $horario: req.body.horario
        }, info => {
            console.log(info);
            res.send(info);
        });
    }

    if (req.body.periodo) {
        db.run('UPDATE seccion SET periodo = $periodo WHERE id = $id', {
            $id: req.params.id,
            $periodo: req.body.periodo
        }, info => {
            console.log(info);
            res.send(info);
        });
    }
});

router.post('/', function (req, res) {

    console.log(req.body);
    db.run('insert into seccion(id, numero, horario, periodo)  values ($id, $numero, $horario, $periodo)', {
        $id: req.body.id,
        $numero: req.body.numero,
        $horario: req.body.horario,
        $periodo: req.body.periodo
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;
