import { Seccion } from "./seccion";

export class Materia {
    /** 
     * @description Nombre de la materia
     * */
    public nombre: string;
    /**
     * @description Id de la materia en bd
     *  */ 
    public id: string;
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
    public prelaciones: Materia[];
    /**
     *  @description Secciones que posee la materia
     * */ 
    public secciones: Seccion[];

    /**
     * @description Creates an instance of Materia.
     * @param {string} nombre nombre de la materia
     * @param {string} id id de la materia
     * @param {number} semestre numero del semestre
     * @param {number} horas cantidad de horas a ver
     * @param {number} horasMax cantidad de horas maxima en un bloque de disponibilidad
     * @param {number} secciones cantiadad de secciones a crear para esta materia
     * @memberof Materia
     */
    constructor(nombre: string, id: string, semestre: number, horas: number, horasMax: number, secciones: number) {
        this.nombre = nombre;
        this.id = id;
        this.semestre = semestre;
        this.horas = horas;
        this.horasMax = horasMax;
        this.prelaciones = [];
        this.secciones = [];
        for(let i = 0; i < secciones; i++) {
            this.secciones.push(new Seccion('40' + i));
        }
    }
}
