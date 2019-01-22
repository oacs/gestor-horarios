import { MateriaClass } from './materiaClass';
import { SeccionClass } from './seccionClass';
import { BloqueHoras } from './BloqueHoras';
import { ordenarPorDia } from '../databaseTransalations/datoToString';

export const CANTIDAD_DE_SEMESTRES = 10;


export class HorarioPeriodoClass {
    /**
     * @description materias por semestres de un periodo de un pensum
     * @memberof HorarioSemestre
     */
    public materiasPorSemestre: MateriaClass[][];
    /**
     * @description nombre del periodo
     * @type {string}
     * @memberof HorarioSemestre
     */
    public periodo: string;
    /**
     * @description Crea una instancia de HorarioSemestre.
     * @memberof HorarioSemestre
     */
    constructor() {
        this.materiasPorSemestre = [];
        for (let i = 0; i < CANTIDAD_DE_SEMESTRES; i++) {
            this.materiasPorSemestre.push([]);
        }
    }
    // /**
    //  * @description agrega la materia al arreglo de materias
    //  * @param materia materia a agregar
    //  * @memberof HorarioSemestre
    //  */
    // public agregarMateria(materia: Materia) {
    //     this.materiasPorSemestre.push(materia);
    // }
    // /**
    //  * @description agrega todas las materias de un arreglo dado al arreglo de materias
    //  * @param {Materia[]} materias materias a agregar
    //  * @memberof HorarioSemestre
    //  */
    // public agregarMaterias(materias: Materia[]) {
    //     materias.forEach(materia => {
    //         this.materia.push(materia);
    //     });
    // }
    public obtenerBloquesPosibles(idMateria: number, semestre: number, idSeccion: string): BloqueHoras[] {
        const seccionAux = this.obtenerSeccion(idMateria, semestre, idSeccion);
        const materiaAux = this.obtenerMateria(idMateria, semestre);
        let noDisponible: BloqueHoras[] = [];
        const disponible: BloqueHoras[] = [];
        // Semestre previo
        if (semestre > 1 && this.materiasPorSemestre[semestre - 2] != null) {
            this.materiasPorSemestre[semestre - 2].forEach(materia => {
                if (materiaAux.prelaciones.findIndex(prelacion => prelacion.id === materia.id) < 0) {
                    materia.secciones.forEach(seccion => {
                        seccion.BloqueHorasFinal.forEach(bloque => {
                            noDisponible.push(bloque);
                        });
                    });
                }
            });
        }
        // Semestre actual
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            materia.secciones.forEach(seccion => {
                if (materia.id !== materiaAux.id || (materia.id === materiaAux.id && seccion.profesor === seccionAux.profesor)) {
                    seccion.BloqueHorasFinal.forEach(bloque => {
                        noDisponible.push(bloque);
                    });
                }
            });
        });
        // Semestre siguiente
        if (semestre < 10 && this.materiasPorSemestre[semestre] != null) {
            this.materiasPorSemestre[semestre].forEach(materia => {
                if (materia.prelaciones.findIndex(prelacion => prelacion.id === materiaAux.id) < 0) {
                    materia.secciones.forEach(seccion => {
                        seccion.BloqueHorasFinal.forEach(bloque => {
                            noDisponible.push(bloque);
                        });
                    });
                }
            });
        }
        materiaAux.correquisito.forEach(materia => {
            materia.secciones.forEach(seccion => {
                seccion.BloqueHorasFinal.forEach(bloque => {
                    noDisponible.push(bloque);
                });
            });
        });
        this.invertirBloques(seccionAux.profesor.disponibilidad).forEach(bloque => {
            noDisponible.push(bloque);
        });
        console.log('no disp dirty ----\n');
        console.log(noDisponible);
        noDisponible = ordenarPorDia(noDisponible);
        noDisponible = this.compactarBloques(noDisponible);
        console.log('no disp compactado -----\n');
        console.log(noDisponible);
        // console.log(' -----\n');
        // console.log('disp\n');
        // console.log(this.invertirBloques(noDisponible));
        // console.log('--------------\n');
        return this.invertirBloques(noDisponible);
    }
    public compactarBloques(bloques: BloqueHoras[]): BloqueHoras[] {
        let flag = -1;
        let del: number[] = [];
        while (flag !== 0) {
            flag = 0;
            bloques.forEach((a, i) => {
                // console.log(`​HorarioPeriodo -> del.indexOf(${i})`, del.indexOf(i));
                if (del.indexOf(i) === -1) {
                    bloques.forEach((b, j) => {
                        if (i !== j && a.dia === b.dia) {

                            // console.log('​a, b', a, b);
                            // console.log('compararBloques(a, b)', this.compararBloques(a, b));
                            switch (this.compararBloques(a, b)) {
                                case 1:
                                    a.inicio = b.inicio;
                                    flag = 1;
                                    // console.log(del.indexOf(j));
                                    if (del.indexOf(j) === -1) {
                                        del.push(j);
                                    }
                                    break;
                                case 2:
                                    // console.log('​HorarioPeriodoClass -> a.fin ', a.fin);
                                    a.fin = b.fin;
                                    // console.log('​HorarioPeriodoClass -> a.fin ', a.fin);
                                    flag = 1;
                                    // console.log(del.indexOf(j));
                                    if (del.indexOf(j) === -1) {
                                        del.push(j);
                                    }
                                    // console.log('​HorarioPeriodoClass -> del', del);

                                    break;
                                case 3:
                                    a.fin = b.fin > a.fin ? b.fin : a.fin;
                                    flag = 1;
                                    // console.log(del.indexOf(j));
                                    if (del.indexOf(j) === -1) {
                                        del.push(j);
                                    }
                                    break;
                            }
                        }
                    });
                }
            });
            let dif = 0;
            // console.log('​HorarioPeriodo -> del', del);
            if (del.length > 0) {
                del.forEach(indice => {

                    // console.log('​HorarioPeriodoClass -> indice - dif', indice - dif, bloques[indice - dif - 1].fin);
                    bloques.splice(indice - dif++, 1);
                    // console.log('​HorarioPeriodoClass -> bloques', bloques);

                });
            }
            // console.log('​HorarioPeriodo -> bloques', bloques);
            del = [];
        }
        // console.log('Resultado -> bloques', bloques);
        return bloques;
    }
    public compararBloquesDeHora(a: BloqueHoras[], b: BloqueHoras[]): number {
        a.forEach(bloqueA => {
            b.forEach(bloqueB => {
                const res = this.compararBloques(bloqueA, bloqueB);
                if (res !== 0) {
                    return res;
                }
            });
        });
        return 0;
    }
    public compararBloques(a: BloqueHoras, b: BloqueHoras): number {
        if (a.dia === b.dia && a.prioridad === b.prioridad) {
            // A esta por encima de B
            if (a.inicio > b.inicio) {
                if (b.fin > a.inicio) {
                    return 1;
                }
            } else {
                // A esta por debajo de B
                if (a.inicio < b.inicio) {
                    if (a.fin >= b.inicio) {
                        return 2;
                    }
                } else {
                    if (a.inicio === b.inicio) {
                        return 3;
                    }
                }
            }
        }
        return 0;
    }
    public invertirBloques(bloques: BloqueHoras[]): BloqueHoras[] {
        let buffer: BloqueHoras[] = [];
        let prev = 0;
        let diaPrev = bloques[0].dia;
        const diasUtilizados: number[] = [];
        diasUtilizados.push(diaPrev);
        bloques.forEach(bloque => {
            if (bloque.dia === diaPrev) {
                buffer.push(new BloqueHoras(diaPrev, prev, bloque.inicio));
                prev = bloque.fin;
            } else {
                buffer.push(new BloqueHoras(diaPrev, prev, 14));
                diaPrev = bloque.dia;
                diasUtilizados.push(diaPrev);
                prev = 0;
                buffer.push(new BloqueHoras(diaPrev, prev, bloque.inicio));
                prev = bloque.fin;
            }
        });
        if (diasUtilizados.length !== 7) {
            for (let i = 0; i < 7; i++) {
                if (diasUtilizados.indexOf(i) === -1) {
                    buffer.push(new BloqueHoras(i, 0, 14));
                }
            }
        }
        buffer.push(new BloqueHoras(diaPrev, prev, 14));
        // console.log('Invertir -> buffer', buffer);
        buffer = ordenarPorDia(buffer);
        return buffer;
    }
    public obtenerSeccion(idMateria: number, semestre: number, idSeccion: string): SeccionClass {
        let seccionAux: SeccionClass = null;
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            materia.secciones.forEach(seccion => {
                if (seccion.id === idSeccion) {
                    seccionAux = seccion;
                    return seccionAux;
                }
            });
        });
        return seccionAux;
    }
    public obtenerMateria(idMateria: number, semestre: number): MateriaClass {
        let aux: MateriaClass = null;
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            if (materia.id === idMateria) {
                // console.log(materia);
                aux = materia;
                return materia;
            }
        });
        return aux;
    }
    public verificarBloqueEnHorario() { }
    public guardarBloqueEnHorario() { }
}
