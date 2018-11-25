import {db} from '../index';
import {Router} from 'express';

const router = Router();

router.get('/', function (req, res) {
    db.get('select * from materia', (err, row) => {
        console.log(err);
        console.log(row);
        res.send(row);
    });
});

module.exports = router;