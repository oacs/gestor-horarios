import { SeccionClass } from './seccionClass';

export class MateriaClass {
    /**
     * @description Nombre de la materia
     * */
    public nombre: string;
    /**
     * @description Id de la materia en bd
     *  */
    public id: number;
    /**
     * @description Numero del semestre
     *  */
    public semestre: number;
    /**
     * @description Horas que se deben de ver en la materia
     *  */
    public horas: number;
    /**
     * @description Horas maxima que se pueden ver en una clase
     * */
    public horasMax: number;
    /**
     * @description Materias que prelan esta materia
     * */
    public prelaciones: MateriaClass[];
    /**
     *  @description Secciones que posee la materia
     * */
    public secciones: SeccionClass[];

    /**
     * @description Creates an instance of Materia.
     * @param {string} nombre nombre de la materia
     * @param {string} id id de la materia
     * @param {number} semestre numero del semestre
     * @param {number} horas cantidad de horas a ver
     * @param {number} horasMax cantidad de horas maxima en un bloque de disponibilidad
     * @param {number} secciones cantiadad de secciones a crear para esta materia
     * @memberof MateriaClass
     */
    constructor(nombre: string, id: number, semestre: number, horas: number, horasMax: number) {
        this.nombre = nombre;
        this.id = id;
        this.semestre = semestre;
        this.horas = horas;
        this.horasMax = horasMax;
        this.prelaciones = [];
        this.secciones = [];
    }


}
