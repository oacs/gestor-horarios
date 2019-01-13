import { Materia } from "./materia";
import { Seccion } from "./seccion";
import { BloqueHoras } from "./BloqueHoras";

export const CANTIDAD_DE_SEMESTRES = 10;
export class HorarioPeriodo {
    /**
     * @description materias por semestres de un periodo de un pensum
     * @memberof HorarioSemestre
     */
    public materiasPorSemestre: Materia[][];
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

    public obtenerBloquesPosibles(idMateria: string, semestre: number, idSeccion: string): BloqueHoras[] {
        let seccion = this.obtenerSeccion(idMateria, semestre, idSeccion);
        let materia = this.obtenerMateria(idMateria, semestre);
        console.log(materia);
        let noDisponible: BloqueHoras[] = [];
        let disponible: BloqueHoras[] = [];
        materia.prelaciones.forEach(materia => {
            materia.secciones.forEach(seccion => {
                seccion.BloqueHorasFinal.forEach(bloque => {
                    noDisponible.push(bloque);
                })
            })
        });
        console.log('no disp\n');
        console.log(noDisponible);
        noDisponible = this.compactarBloques(noDisponible);

        console.log('disp\n');
        console.log(this.invertirBloques(noDisponible));
        console.log('--------------\n');
        return this.invertirBloques(noDisponible);
    }

    public compactarBloques(bloques: BloqueHoras[]): BloqueHoras[] {
        let flag = -1;
        let del: number[] = [];
        while (flag != 0) {
            flag = 0;
            bloques.forEach((a, i) => {
                bloques.forEach((b, j) => {
                    if (i != j) {
                        switch (this.compararBloques(a, b)) {
                            case 1: a.inicio = b.inicio;
                                flag = 1;
                                if (del.indexOf(j)!=-1) { del.push(j); }
                                break;
                            case 2: a.fin = b.fin;
                                flag = 1;
                                if (del.indexOf(j)!=-1) { del.push(j); }
                                break;
                        }
                    }
                })
            });
            let dif = 0;
            del.forEach( indice => {
                bloques = bloques.splice(indice - dif++, 1);
            })
            del = [];
        }
        return bloques;
    }

    public compararBloquesDeHora(a: BloqueHoras[], b: BloqueHoras[]): number {
        a.forEach(bloqueA => {
            b.forEach(bloqueB => {
                const res = this.compararBloques(bloqueA, bloqueB);
                if (res != 0) {
                    return res;
                }
            });
        });
        return 0;
    }

    public compararBloques(a: BloqueHoras, b: BloqueHoras): number {
        if (a.dia == b.dia) {
            // A esta por encima de B
            if (a.inicio > b.inicio) {
                if (b.fin > a.inicio) {
                    return 1;
                }
            } else {
                // A esta por debajo de B
                if (a.inicio < b.inicio) {
                    if (a.fin > b.inicio) {
                        return 2;
                    }
                }
            }
        }
        return 0;
    }

    public invertirBloques(bloques: BloqueHoras[]): BloqueHoras[] {
        const buffer: BloqueHoras[] = [];
        let prev = 0;
        let diaPrev = bloques[0].dia;
        bloques.forEach( bloque => {
            if ( bloque.dia == diaPrev) {
                buffer.push(new BloqueHoras(diaPrev, prev, bloque.inicio))
                prev = bloque.fin;
            } else {
                buffer.push(new BloqueHoras(diaPrev, prev, 14))
                diaPrev = bloque.dia;
                prev = 0;
            }
        });
        buffer.push(new BloqueHoras(diaPrev, prev, 14))
        
        return buffer;
    }

    public obtenerSeccion(idMateria: string, semestre: number, idSeccion: string): Seccion {
        let seccion: Seccion = null;
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            materia.secciones.forEach(seccion => {
                if (seccion.id == idSeccion) {
                    return seccion;
                }
            })
        })
        return seccion;
    }

    public obtenerMateria(idMateria: string, semestre: number): Materia {
        let aux: Materia = null;
        this.materiasPorSemestre[semestre - 1].forEach(materia => {
            
            if (materia.id === idMateria) {
                console.log(materia);
                aux = materia;
                return materia;
            }
        })
        return aux;
    }
    public verificarBloqueEnHorario() { }
    public guardarBloqueEnHorario() { }

}
