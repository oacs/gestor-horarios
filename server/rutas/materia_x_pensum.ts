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

router.get('/:id_materia/:id_pensum', function (req, res) {
    let query = 'select * from materia_x_pensum where ';
    let vars = {id_materia: 0, id_pensum: 0};
    if(req.params.id_materia){
        query+= ' id_materia = $id_materia'
        vars.id_materia = req.params.id_materia
    }
    if(req.params.id_pensum){
        query+= ' id_pensum = $id_pensum',
        vars.id_pensum = req.params.id_pensum
    }

    db.get(query,vars, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
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