import { Profesor } from './profesor';
import { stringToDisponibilidad } from '../databaseTransalations/stringToData';
import { DisponibilidadToString } from '../databaseTransalations/datoToString';
import { Seccion } from './seccion';
import { Materia } from './materia';
import { BloqueHoras } from './BloqueHoras';
import { HorarioPeriodo } from './horario-semestre';

export const profesores: Profesor[] = [
    {
        nombre: 'Oscar',
        correo: 'oacs@gmail.com',
        disponibilidad: stringToDisponibilidad('0131571,11418A1'),
        id: '0'
    }
];

export const secciones: Seccion[] = [
    new Seccion('401', profesores[0])
];
const matematica =  new Materia('matematica', '0', 1, 0, 2);
secciones[0].BloqueHorasFinal.push(new BloqueHoras(0, 1, 3));
matematica.secciones.push(secciones[0]);
const prog =  new Materia('prog1', '1', 2, 0, 2);
prog.secciones.push(secciones[0]);
prog.prelaciones.push(matematica);

export const materiasPorSemestre: Materia[][] = [
    [
       matematica
    ],
    [
        prog
    ]
];

const hs: HorarioPeriodo = new HorarioPeriodo();
hs.materiasPorSemestre = materiasPorSemestre;



console.log(profesores[0]);
console.log(DisponibilidadToString(profesores[0].disponibilidad));


console.log(hs.obtenerBloquesPosibles('1', 2, '401'));
console.log(secciones[0]);
