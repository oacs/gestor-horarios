import { db } from '../index';
import { Router } from 'express';

const router = Router();

/**Obtengo todos los registros
 * 
 */
router.get('/', function (req, res) {
    db.all('select * from pensum', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
/**Obtengo todas las materias de un pensum
 * @param id int
 */
router.get('/materias', function (req, res) {
    const query = 'select m.*, mxp.semestre as semestre, mxp.horas as horas, mxp.maxH as maxH from materia as m '
        + ' inner join materia_x_pensum as mxp on mxp.id_materia = m.id'
        + ' inner join pensum as p on p.id = mxp.id_pensum '
        + ' where p.id = $id ';
    db.all(query, {
        $id: req.query.id_pensum,
    }, (err, info) => {
        console.log('perro');
        console.log(req.query.id_pensum);
        console.log(query);
        console.log(info);
        console.log(err);
        res.send(info);
    });
});
/**Obtengo un registro dado su id
 * @param id int
 */
router.get('/:id', function (req, res) {

    db.get('select * from pensum where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});
/**Elimino un registro dado su id
 * @param id int
 */
router.delete('/:id', function (req, res) {

    db.get('delete from pensum where id = ' + req.params.id, (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

/**Obtengo todas los periodos de un pensum
 * @param id int
 */
router.get('/:id/periodos', function (req, res) {
    console.log(req.params.id);
    let query = 'select * from periodo as per '
        + ' inner join pensum as pem on per.id_pensum = pem.id '
        + ' where pem.id = $id'
    db.run(query, {
        $id: req.params.id,
    }, info => {
        console.log(info);
        res.send(info);
    });
});
/**Actualizo un registro dado su id
 * @param id int
 * @body fecha text
 */
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
/**Le agrega una nueva materia al pensum actual
 * @param id
 * @body id_pensum int
 * @body id_materia int
 * @body id_pensum int
 * @body horas int
 * @body maxH int
 */
router.post('/materia', function (req, res) {
    db.run('insert into materia_x_pensum (horas,maxH,id_pensum,id_materia) values ($horas,$maxH,$id_pensum,$id_materia)', {
        $id_pensum: req.body.id_pensum,
        $id_materia: req.body.id_materia,
        $horas: req.body.horas,
        $maxH: req.body.maxH
    }, info => {
        console.log(info);
        res.send(info);
    });
});
/** Inserta un nuevo regsitro
 * @body fecha text 
 */
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
