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

router.get('/:id/materias', function (req, res) {
    let query = 'select * from materia as m'
        +'inner join materia_x_pensum as mxp on mxp.id_materia = m.id'
        +'inner join pensum as p on p.id = mxp.id_pensum'
        +'where p.id = $id'
        db.run(query, {
            $id: req.params.id,
        }, info => {
            console.log(info);
            res.send(info);
        });
});

router.get('/:id/periodos', function (req, res) {
    let query = 'select * from periodo as per'
        +'inner join pensum as pem on per.id_pensum = pem.id'
        +'where pem.id = $id'
        db.run(query, {
            $id: req.params.id,
        }, info => {
            console.log(info);
            res.send(info);
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
router.post('/:id/materia', function (req, res) {
    if (req.body.fecha) {
        db.run('insert into materia_x_pensum (horas,horasM,id_pensum,id_materia) values ($horas,$horasM,$id_pensum,$id_materia)', {
            $id_pensum: req.params.id,
            $id_materia: req.body.id_materia,
            $horas : req.body.horas,
            $horasM : req.body.horasM
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
