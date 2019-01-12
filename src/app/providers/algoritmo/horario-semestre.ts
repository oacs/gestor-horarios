import { Materia } from "./materia";

export class HorarioSemestre {
    /**
     * @description materias de un periodo de un pensum
     * @type {Materia[]}
     * @memberof HorarioSemestre
     */
    public materia: Materia[];
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
    }

    /**
     * @description agrega la materia al arreglo de materias
     * @param materia materia a agregar
     * @memberof HorarioSemestre
     */
    public agregarMateria(materia: Materia) {
        this.materia.push(materia);
    }

    /**
     * @description agrega todas las materias de un arreglo dado al arreglo de materias
     * @param {Materia[]} materias materias a agregar
     * @memberof HorarioSemestre
     */
    public agregarMaterias(materias: Materia[]) {
        materias.forEach( materia => {
            this.materia.push(materia);
        });
    }
}
