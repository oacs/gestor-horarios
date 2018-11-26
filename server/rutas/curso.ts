import { db } from '../index';
import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.all('select * from curso', (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.get('/getBy', function (req, res) {
    let query = 'select * from curso where '
    if(req.params.id_profesor) query+= ' id_profesor ='+req.params.id_profesor +','
    
    if(req.params.id_periodo) query+= ' id_periodo ='+req.params.id_periodo +','

    if(req.params.id_materia) query+= ' id_materia ='+req.params.id_materia +','

    if(req.params.semestre) query+= ' semestre ='+req.params.semestre +','

    if(req.params.seccion) query+= ' seccion ='+req.params.seccion +','

    if(req.params.id_pensum) query+= ' id_pensum ='+req.params.id_pensum +','

    if(req.params.horario) query+= ' horario ='+req.params.horario +','
    
    query = query.substr(0,query.length-1)
    if(query != 'select * from curso where')
    db.get(query, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.delete('/:id', function (req, res) {

    db.get('delete from curso where id_periodo = ' + req.params.id_periodo +' and id_materia = ' + req.params.id_materia +' and seccion = ' + req.params.seccion + ' and id_pensum = ' + req.params.id_pensum, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    let query = 'update curso set '
    if (req.body.semestre) query+= ' semestre = '+req.body.semestre
    if (req.body.seccion) query+= ' id_profesor = '+req.body.id_profesor
    if (req.body.horario) query+= ' horario = '+req.body.horario

    query+= ' where id_periodo = $id_periodo and id_materia = $id_materia and id_pensum = $id_pensum and seccion = $seccion'
    if(query != 'update curso set where  id_periodo = $id_periodo and id_materia = $id_materia and id_pensum = $id_pensum and seccion = $seccion')
    if (req.body.nombre) {
        db.run(query, {
            $id_periodo: req.params.id_periodo,
            $id_materia: req.params.id_materia,
            $id_pensum: req.params.id_pensum,
            $seccion: req.params.seccion,
        }, info => {
            console.log(info);
            res.send(info);
        });
    }
    res.status(400).send('error parametros no valido: enum[nombre,id]')
});

router.post('/', function (req, res) {

    // console.log(req.body);
    db.run('insert into curso( id_profesor, id_periodo, id_materia, semestre, seccion, id_pensum)  values ( $id_profesor, $id_periodo, $id_materia, $semestre, $seccion, $id_pensum)', {
        $id_profesor: req.body.id_pro$id_profesor,
        $id_periodo: req.body.id_periodo,
        $id_materiasemestre: req.body.id$id_materiasemestre,
        $semestre: req.body.semestre,
        $seccion: req.body.seccion,
        $id_pensum: req.body.id_pe$id_pensum
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;
