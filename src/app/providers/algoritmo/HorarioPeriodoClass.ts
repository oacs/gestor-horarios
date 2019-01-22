import { MateriaClass } from './materiaClass';
import { SeccionClass } from './seccionClass';
import { BloqueHoras } from './BloqueHoras';
import { ordenarPorDia } from '../databaseTransalations/datoToString';
import { Dias } from './enum';

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
        const noDisponible: BloqueHoras[] = [];
        const seccionAux = this.obtenerSeccion(idMateria, semestre, idSeccion);
        const materiaAux = this.obtenerMateria(idMateria, semestre);
        let disponible: BloqueHoras[] = [];
        let cont = disponible.length;
        console.log('inicio -> cont', cont);
        // Semestre previo
        // console.log('Semestre previo');
        if (semestre > 1 && this.materiasPorSemestre[semestre - 2] != null) {
            this.materiasPorSemestre[semestre - 2].forEach(materia => {
                if (materiaAux.prelaciones.findIndex(prelacion => prelacion.id === materia.id) < 0) {
                    materia.secciones.forEach(seccion => {
                        // console.log('Semestre prev -> seccion', seccion);
                        seccion.BloqueHorasFinal.forEach(bloque => {
                            noDisponible.push(bloque);
                            noDisponible.push(bloque);

                            console.log('previo -> bloque', bloque);
                            console.log('previo -> cont', cont);
                            cont++;
                            // console.log('json', JSON.parse(JSON.stringify(bloque)));
                            // console.log(noDisponible);
                        });
                        // console.log(noDisponible);
                    });
                }
            });
        }
        // Semestre actual
        // console.log('Semestre actual');
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            materia.secciones.forEach(seccion => {
                if (materia.id !== materiaAux.id || (materia.id === materiaAux.id && seccion.profesor === seccionAux.profesor)) {
                    // console.log('​Semestre actual -> seccion', seccion);
                    seccion.BloqueHorasFinal.forEach(bloque => {
                        noDisponible.push(bloque);
                        // noDisponible.push(bloque);

                        console.log('actual -> bloque', bloque);
                        console.log('actual -> cont', cont);
                        cont++;
                        // console.log('json', JSON.parse(JSON.stringify(bloque)));
                        // console.log(noDisponible);
                    });
                    // console.log(noDisponible);
                }
            });
        });
        // Semestre siguiente
        if (semestre < 10 && this.materiasPorSemestre[semestre] != null) {
            this.materiasPorSemestre[semestre].forEach(materia => {
                if (materia.prelaciones.findIndex(prelacion => prelacion.id === materiaAux.id) < 0) {
                    materia.secciones.forEach(seccion => {
                        // console.log('Semestre sig -> seccion', seccion);
                        seccion.BloqueHorasFinal.forEach(bloque => {
                            noDisponible.push(bloque);
                            // noDisponible.push(bloque);

                            console.log('siguiente -> bloque', bloque);
                            console.log('siguiente -> cont', cont);
                            cont++;
                        });
                        // console.log(noDisponible);
                    });
                }
            });
        }
        materiaAux.correquisito.forEach(materia => {
            materia.secciones.forEach(seccion => {
                seccion.BloqueHorasFinal.forEach(bloque => {
                    noDisponible.push((bloque));
                    // noDisponible.push((bloque));
                    console.log('correquisito -> bloque', bloque);
                    console.log('correquisito -> cont', cont);
                    cont++;
                });
            });
        });

        // console.log(seccionAux.profesor.disponibilidad);
        console.log(this.invertirBloques(ordenarPorDia(seccionAux.profesor.disponibilidad.slice(0))));
        this.invertirBloques(seccionAux.profesor.disponibilidad.slice(0)).forEach(bloque => {
            noDisponible.push({
                dia: bloque.dia + 0,
                inicio: bloque.inicio + 0,
                fin: bloque.fin + 0,
            });
            console.log(bloque.fin);
            // noDisponible.push(bloque);

            console.log(bloque);
            console.log('disponibilidad -> cont', cont);
            cont++;
        });
        console.log('cont', cont);
        // console.log('no disp dirty ----\n');
        console.log(noDisponible);
        // noDisponible = ;
        // console.log('​ordenarPorDia ', ordenarPorDia(noDisponible.slice(0)));
        let auxD: BloqueHoras[] = ordenarPorDia(noDisponible.slice(0));
        // console.log('​HorarioPeriodoClass -> auxD', auxD);

        auxD = this.compactarBloques(auxD);
        // console.log('no disp compactado -----\n');
        // console.log(noDisponible);
        // console.log(' -----\n');
        // console.log('disp\n');
        // console.log(this.invertirBloques(JSON.parse(JSON.stringify(noDisponible))));
        // console.log('--------------\n');
        disponible = this.compactarBloques(this.invertirBloques(auxD.slice(0)).slice(0)).slice(0);
        // noDisponible.splice(0, noDisponible.length)
        return disponible;
    }
    public compactarBloques(bloquesIn: BloqueHoras[]): BloqueHoras[] {
        console.log('Antes de compactar -----------', bloquesIn);
        const bloques = bloquesIn.slice(0);
        let flag = -1;
        let del: number[] = [];
        while (flag !== 0) {
            flag = 0;
            bloques.forEach((a, i) => {
                // console.log(`​HorarioPeriodo -> del.indexOf(${i})`, del.indexOf(i));
                if (del.indexOf(i) === -1) {
                    bloques.forEach((b, j) => {
                        if (i !== j && a.dia === b.dia) {

                            // // console.log('​a, b', a, b);
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
                                    // // console.log('​HorarioPeriodoClass -> a.fin ', a.fin);
                                    a.fin = b.fin;
                                    // // console.log('​HorarioPeriodoClass -> a.fin ', a.fin);
                                    flag = 1;
                                    // console.log(del.indexOf(j));
                                    if (del.indexOf(j) === -1) {
                                        del.push(j);
                                    }
                                    // // console.log('​HorarioPeriodoClass -> del', del);

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
            // // console.log('​HorarioPeriodo -> del', del);
            if (del.length > 0) {
                del.forEach(indice => {

                    // // console.log('​HorarioPeriodoClass -> indice - dif', indice - dif, bloques[indice - dif - 1].fin);
                    bloques.splice(indice - dif++, 1);
                    // // console.log('​HorarioPeriodoClass -> bloques', bloques);

                });
            }
            // // console.log('​HorarioPeriodo -> bloques', bloques);
            del = [];
        }
        // console.log('Resultado -> bloques', bloques);
        console.log('Despues de compactar -----------', bloques);
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
    // public invertirBloques(bloques: BloqueHoras[]): BloqueHoras[] {
    //     let buffer: BloqueHoras[] = [];
    //     let prev = 0;
    //     let diaPrev = bloques[0].dia;
    //     const diasUtilizados: number[] = [];
    //     diasUtilizados.push(diaPrev);
    //     bloques.forEach(bloque => {
    //         if (bloque.dia === diaPrev) {
    //             if (prev !== bloque.inicio) {

    //                 buffer.push(new BloqueHoras(diaPrev, prev, bloque.inicio));
    //             } else {
    //                 buffer.push(new BloqueHoras(diaPrev, prev, bloque.fin));
    //             }
    //             prev = bloque.fin;
    //         } else {
    //             buffer.push(new BloqueHoras(diaPrev, prev, 14));
    //             diaPrev = bloque.dia;
    //             diasUtilizados.push(diaPrev);
    //             prev = 0;
    //             if (prev !== bloque.inicio) {

    //                 buffer.push(new BloqueHoras(diaPrev, prev, bloque.inicio));
    //             } else {
    //                 buffer.push(new BloqueHoras(diaPrev, prev, bloque.fin));
    //             }
    //             prev = bloque.fin;
    //         }
    //     });
    //     if (diasUtilizados.length !== 7) {
    //         for (let i = 0; i < 7; i++) {
    //             if (diasUtilizados.indexOf(i) === -1) {
    //                 buffer.push(new BloqueHoras(i, 0, 14));
    //             }
    //         }
    //     }
    //     buffer.push(new BloqueHoras(diaPrev, prev, 14));
    //     // console.log('Invertir -> buffer', buffer);
    //     buffer = ordenarPorDia(buffer);
    //     return buffer;
    // }

    public invertirBloques(bloques: BloqueHoras[]): BloqueHoras[] {
        const buffer: BloqueHoras[] = [];
        console.log(bloques);
        let dia = -1;
        let prev = 0;
        const diasUtilizados: number[] = [];
        bloques.forEach(bloque => {
            if (dia === -1) {
                dia = bloque.dia;
                diasUtilizados.push(dia);
            }
            if (dia === bloque.dia) {
                if (prev === bloque.inicio) {
                    prev = bloque.fin;
                } else {
                    buffer.push(new BloqueHoras(dia, prev, bloque.inicio));
                    prev = bloque.fin;
                }
            } else {
                if (prev !== 14) {
                    buffer.push(new BloqueHoras(dia, prev, 14));
                }
                dia = bloque.dia;
                diasUtilizados.push(dia);
                prev = 0;
                if (prev === bloque.inicio) {
                    prev = bloque.fin;
                } else {
                    buffer.push(new BloqueHoras(dia, prev, bloque.inicio));
                    prev = bloque.fin;
                }
            }
        });
        if (prev !== 14) {
            buffer.push(new BloqueHoras(dia, prev, 14));
        }
        if (diasUtilizados.length !== 7) {
            for (let i = 0; i < 7; i++) {
                if (diasUtilizados.indexOf(i) === -1) {
                    buffer.push(new BloqueHoras(i, 0, 14));
                }
            }
        }
        if (buffer == null) {
            console.log('buffer vacio');
        }
        return buffer;
    }
    public obtenerSeccion(idMateria: number, semestre: number, idSeccion: string): SeccionClass {
        let seccionAux: SeccionClass = null;
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            if (materia.id === idMateria) {

                materia.secciones.forEach(seccion => {
                    if (seccion.id === idSeccion) {
                        seccionAux = seccion;
                        return seccionAux;
                    }
                });
            }
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
    public obtenerMateriaSinSemetre(idMateria: number): MateriaClass {
        let aux: MateriaClass = null;
        this.materiasPorSemestre.forEach(semestre => {
            semestre.forEach(materia => {
                if (materia.id === idMateria) {
                    // console.log(materia);
                    aux = materia;
                    return materia;
                }
                if (aux != null) {
                    return;
                }
            });
        });
        return aux;
    }
    public verificarBloqueEnHorario() { }
    public guardarBloqueEnHorario() { }
}
