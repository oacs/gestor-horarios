import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from materia_x_pensum', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.get('/:id', function (req, res) {

    if(req.body.id_pensum){
        db.get('select * from materia_x_pensum where id_pensum = ' + req.params.id_pensum, (err, row) => {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    }

    if(req.body.id_materia){
        db.get('select * from materia_x_pensum where id_materia = ' + req.params.id_materia, (err, row) => {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    }

    if(req.body.id){
        db.get('select * from materia_x_pensum where id = ' + req.params.id, (err, row) => {
            console.log(err);
            console.log(row);
            res.send(row);
        });
    }
});

router.delete('/:id', function (req, res) {

    db.get('delete from materia_x_pensum where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

router.post('/', function (req, res) {

    console.log(req.body);
    db.run("insert into materia_x_pensum(id_pensum, id_materia, id)  values ($id_pensum, $id_materia, $id)", {
        $id_pensum: req.body.id_pensum,
        $id_materia: req.body.id_materia,
        $id: req.body.id
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;