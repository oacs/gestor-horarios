import { BloqueHoras } from '../algoritmo/BloqueHoras';

/**
 * @description convierte BloqueHoras del usuario en una string de 1 y 0
 * @param {BloqueHoras[]} disp arreglo de los bloques de hora en una semana
 * @returns {string} BloqueHoras como esta almacenada en bd
 * @memberof Profesor
 */
export function BloqueHorasToString(disp: BloqueHoras[]): string {
    let texto = '';
    disp = ordenarPorDia(disp);
    let day = disp[0].dia;
    texto += day + '';
    disp.forEach(row => {
        if ( day !== row.dia) {
            day = row.dia;
            texto += ',' + day;
        }
        texto += ( numberToHexString(row.inicio) + numberToHexString(row.fin));
    });
    return texto;
}

/**
 * @description convierte BloqueHoras del usuario en una string de 1 y 0
 * @param {BloqueHoras[]} disp arreglo de los bloques de hora en una semana
 * @returns {string} BloqueHoras como esta almacenada en bd
 * @memberof Profesor
 */
export function DisponibilidadToString(disp: BloqueHoras[]): string {
    let texto = '';
    disp = ordenarPorDia(disp);
    let day = disp[0].dia;
    texto += day + '';
    disp.forEach(row => {
        if ( day !== row.dia) {
            day = row.dia;
            texto += ',' + day;
        }
        texto += ( numberToHexString(row.inicio) + numberToHexString(row.fin) + row.prioridad);
    });
    return texto;
}

export function ordenarPorDia(bloques: BloqueHoras[]): BloqueHoras[] {
    return bloques.sort( (a: BloqueHoras, b: BloqueHoras) => {
        if ( a.dia > b.dia) {
            return 1;
        }
        return 0;
    });
}

export function numberToHexString(numero: number): string {
    switch (numero) {
        case 1: return '1';
        case 2: return '2';
        case 3: return '3';
        case 4: return '4';
        case 5: return '5';
        case 6: return '6';
        case 7: return '7';
        case 8: return '8';
        case 9: return '9';
        case 10: return 'A';
        case 11: return 'B';
        case 12: return 'C';
        case 13: return 'D';
        case 14: return 'E';
        case 15: return 'F';
        default: return '0';
    }
}
