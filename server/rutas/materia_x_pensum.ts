import { db } from '../index';
import { Router } from 'express';

const router = Router();
/**Obtiene todas los registros
 *
 */
router.get('/', function (req, res) {
    db.all('select * from materia_x_pensum', (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});

/** Obtiene registros dados los parametros
 * @param id_materia int
 * @param id_pensum int
 * @param horas int
 * @param maxH int
 * @return materia_x_pensum[]
 */
router.get('/getBy', function (req, res) {
    const vars = {
        id_materia: 0,
        id_pensum: 0,
        horas: 0,
        maxH: 0
    };
    let query = 'select * from materia_x_pensum where ';
    if (req.params.id_materia) {
        vars.id_materia = req.params.id_materia;
        query += ' id_materia = $id_materia ,';
    }

    if (req.params.id_pensum) {
        vars.id_pensum = req.params.id_pensum;
        query += ' id_pensum = $id_pensum ,';
    }

    if (req.params.horas) {
        vars.horas = req.params.horas;
        query += ' horas = $horas ,';
    }

    if (req.params.maxH) {
        vars.maxH = req.params.maxH;
        query += ' maxH = $maxH ,';
    }
    query = query.substr(0, query.length - 1);
    if (query !== 'select * from materia_x_pensum where') {
        db.get(query, vars, (err, row) => {
            console.log(err);
            // console.log(row);
            res.send(row);
        });
    }
    res.status(400).send('error parametros no valido: enum[id_materia,id_pensum,horas,maxH]');
});
/** Elimina registros dados los id
 * @param id_materia int
 * @param id_pensum int
 * @return materia_x_pensum[]
 */
router.delete('/', function (req, res) {

    db.get('delete from materia_x_pensum where id_materia = '
    + req.params.id_materia + ' and id_pensum = ' + req.params.id_pensum, (err, row) => {
        console.log(err);
        // console.log(row);
        res.send(row);
    });
});
/** Actualiza atributos dado los id
 * @param id_materia int
 * @param id_pensum int
 * @body horas int
 * @body maxH int
 * @return result boolean
 */
router.put('/', function (req, res) {
    const vars = {
        id_materia: req.params.id_materia,
        id_pensum: req.params.id_pensum,
        horas: 0,
        maxH: 0
    };
    let query = 'update materia_x_pensum set';
    if (req.body.horas) {
        vars.horas = req.body.horas;
        query += ' horas = $horas ,';
    }
    if (req.body.maxH) {
        vars.horas = req.body.maxH;
        query += ' maxH = $maxH ,';
    }
    query = query.substr(0, query.length - 1);
    query += ' where id_materia = $id_materia and id_pensum = $id_pensum';
    if (query !== 'update materia_x_pensum set where id_materia = $id_materia and id_pensum = $id_pensum') {
        if (req.body.nombre) {
            db.run(query, vars, info => {
                console.log(info);
                res.send(info);
            });
        }
    }
    res.status(400).send('error parametros no valido: enum[nombre,id]');
});
/** Obtiene registros dados los parametros
 * @body id_materia int
 * @body id_pensum int
 * @body horas int
 * @body maxH int
 * @return result boolean
 */
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
