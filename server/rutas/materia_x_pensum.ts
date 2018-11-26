import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from materia_x_pensum', (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});


router.get('/getBy', function (req, res) {
    let query = 'select * from materia_x_pensum where '
    if(req.params.id_materia) query+= ' id_materia ='+req.params.id_materia +','
    
    if(req.params.id_pensum) query+= ' id_pensum ='+req.params.id_pensum +','

    if(req.params.horas) query+= ' horas ='+req.params.horas +','

    if(req.params.maxH) query+= ' maxH ='+req.params.maxH +','
    
    query = query.substr(0,query.length-1)
    if(query != 'select * from materia_x_pensum where')
    db.get(query, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.delete('/:id', function (req, res) {

    db.get('delete from materia_x_pensum where id_materia = ' + req.params.id_materia +' and id_pensum = '+ req.params.id_pensum, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    let query = 'update materia_x_pensum set '
    if (req.body.horas) query+= ' horas = '+req.body.horas
    if (req.body.maxH) query+= ' maxH = '+req.body.maxH

    query+= ' where id_materia = $id_materia and id_pensum = $id_pensum'
    if(query != 'update materia_x_pensum set  where id_materia = $id_materia and id_pensum = $id_pensum')
    if (req.body.nombre) {
        db.run(query, {
            $id_materia: req.params.id_materia,
            $id_pensum: req.params.id_pensum
        }, info => {
            console.log(info);
            res.send(info);
        });
    }
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.post('/', function (req, res) {

    // console.log(req.body);
    db.run('insert into materia_x_pensum( id_materia, id_pensum, horas, maxH)  values ( $id_materia, $id_pensum, $horas, $maxH)', {
        $id_materia: req.body.id_materia,
        $id_pensum: req.body.id_pensum,
        $horas: req.body.horas,
        $maxH: req.body.maxH
    }, info => {
        console.log(info);
        res.send(info);
    });    
});

module.exports = router;
