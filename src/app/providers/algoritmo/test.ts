import { ProfesorClass } from './profesorClass';
import { stringToDisponibilidad } from '../databaseTransalations/stringToData';
import { DisponibilidadToString } from '../databaseTransalations/datoToString';
import { SeccionClass } from './seccionClass';
import { MateriaClass } from './materiaClass';
import { BloqueHoras } from './BloqueHoras';
import { HorarioPeriodoClass } from './HorarioPeriodoClass';

export const profesores: ProfesorClass[] = [
    {
        nombre: 'Oscar',
        correo: 'oacs@gmail.com',
        disponibilidad: stringToDisponibilidad('0131571,11418A1'),
        id: 0
    }
];

export const secciones: SeccionClass[] = [
    new SeccionClass('401', profesores[0])
];
const matematica = new MateriaClass('matematica', 0, 1, 0, 2);
secciones[0].BloqueHorasFinal.push(new BloqueHoras(0, 1, 3));
matematica.secciones.push(secciones[0]);
const prog = new MateriaClass('prog1', 1, 2, 0, 2);
prog.secciones.push(secciones[0]);
prog.prelaciones.push(matematica);

export const materiasPorSemestre: MateriaClass[][] = [
    [
        matematica
    ],
    [
        prog
    ]
];

const hs: HorarioPeriodoClass = new HorarioPeriodoClass();
hs.materiasPorSemestre = materiasPorSemestre;


console.log('Profesores:\n');
console.log('Normal:');
console.log(profesores[0].disponibilidad);
console.log('\nInvertiro:');
// console.log(profesores[0]);
// console.log(DisponibilidadToString(profesores[0].disponibilidad));
console.log(hs.invertirBloques(profesores[0].disponibilidad));

console.log('Secciones\n');
console.log(hs.obtenerBloquesPosibles('1', 2, '401'));
// console.log(secciones[0]);
