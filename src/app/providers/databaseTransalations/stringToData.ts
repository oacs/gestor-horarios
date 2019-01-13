import { BloqueHoras } from '../algoritmo/BloqueHoras';

/**
 * @description convierte una string de numeros en BloqueHoras de horario
 * @param {string} texto BloqueHoras como esta almacenada en bd
 * @returns {BloqueHoras[]} arreglo de los bloques de hora en una semana
 */
export function stringToBloqueHoras(texto: string): BloqueHoras[] {
    const disp: BloqueHoras[] = [];
    texto.split(',').forEach((dia) => {
        const bloques = dia.substring(1);
        for (let i = 0; i < bloques.length / 2; i++) {
            disp.push(
                new BloqueHoras(
                    Number(dia[0]),
                    stringHexToNumber(bloques[i]),
                    stringHexToNumber(bloques[i + 1])
                )
            );
        }
    });
    return disp;
}

/**
 * @description convierte una string de numeros en BloqueHoras de disponibilidad de profesores
 * @param {string} texto BloqueHoras como esta almacenada en bd
 * @returns {BloqueHoras[]} arreglo de los bloques de hora en una semana
 */
export function stringToDisponibilidad(texto: string): BloqueHoras[] {
    const disp: BloqueHoras[] = [];
    texto.split(',').forEach((dia) => {
        const bloques = dia.substring(1);
        for (let i = 0; i < bloques.length / 2; i++) {
            disp.push(
                new BloqueHoras(
                    Number(dia[0]),
                    stringHexToNumber(bloques[i]),
                    stringHexToNumber(bloques[i + 1]),
                    Number(bloques[i + 1])
                )
            );
        }
    });
    return disp;
}

export function stringHexToNumber(numero: string): number {
    switch (numero) {
        case '1': return 1;
        case '2': return 2;
        case '3': return 3;
        case '4': return 4;
        case '5': return 5;
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        case 'A': return 10;
        case 'B': return 11;
        case 'C': return 12;
        case 'D': return 13;
        case 'E': return 14;
        case 'F': return 15;
        default: return 0;
    }
}


