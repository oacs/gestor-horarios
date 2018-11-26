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
    let vars ={id_profesor : 0,id_periodo : 0,id_materia: 0,seccion: '',id_pensum : 0, semestre : 0}
    if(req.params.id_profesor){
        vars.id_profesor = req.params.id_profesor
        query+= ' id_profesor = $id_profesor ,'
    } 
    
    if(req.params.id_periodo){
        vars.id_periodo = req.params.id_periodo
        query+= ' id_periodo = $id_periodo ,'
    } 

    if(req.params.id_materia){
        vars.id_materia = req.params.id_materia
        query+= ' id_materia = $id_materia ,'
    } 

    if(req.params.semestre){
        vars.semestre = req.params.semestre
        query+= ' semestre = $semestre ,'
    } 
    
    if(req.params.seccion){
        vars.seccion = req.params.seccion
        query+= ' seccion = $seccion ,'
    } 

    if(req.params.id_pensum){
        vars.id_pensum = req.params.id_pensum
        query+= ' id_pensum = $id_pensum ,'    
    } 
    query = query.substr(0,query.length-1)
    
    if(query != 'select * from curso where')
    db.get(query,vars, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
    res.status(400).send('error parametros no valido: enum[id_profesor,id_periodo,id_materia,semestre,seccion,id_pensum]')
});

router.delete('/:id', function (req, res) {

    db.get('delete from curso where id = ' + req.params.id, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

router.put('/:id', function (req, res) {
    let vars = {
        semestre : 0,
        id_profesor :'',
        horario : '',
        id_materia : req.params.id_materia, 
        id_pensum : req.params.id_pensum, 
        id_periodo : req.params.id_periodo,
        seccion : req.params.seccion
    }
    let query = 'update curso set'
    if(req.body.semestre){
        vars.semestre = req.body.semestre
        query+= ' semestre = $semestre ,'
    } 
    
    if(req.body.id_profesor){
        vars.id_profesor = req.body.id_profesor
        query+= ' id_profesor = $id_profesor ,'
    }
    if (req.body.horario){
        vars.horario = req.body.horario
        query+= ' horario = $horario ,'
    } 
    query = query.substr(0,query.length-1)

    query+= ' where id_periodo = $id_periodo and id_materia = $id_materia and id_pensum = $id_pensum and seccion = $seccion'
    if(query != 'update curso set where id_periodo = $id_periodo and id_materia = $id_materia and id_pensum = $id_pensum and seccion = $seccion')
    db.run(query,vars, info => {
        console.log(info);
        res.send(info);
    });
    res.status(400).send('error...')
});

router.post('/', function (req, res) {

    // console.log(req.body);
    db.run('insert into curso( id_profesor, id_periodo, id_materia, semestre, seccion, id_pensum)  values ( $id_profesor, $id_periodo, $id_materia, $semestre, $seccion, $id_pensum)', {
        $nombre: req.body.nombre
    }, info => {
        console.log(info);
        res.send(info);
    });
});

module.exports = router;
