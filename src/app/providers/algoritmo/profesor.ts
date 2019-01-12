import { Horario } from "./interface";

export class Profesor {
    /**
     * @description nombre del profesor
     * @type {string}
     * @memberof Profesor
     */
    public nombre: string;
    /**
     * @description id del profesor en la bd
     * @type {string}
     * @memberof Profesor
     */
    public id: string;
    /**
     * @description disponibilidad del profesor en arreglo de enum
     * @type {Horario[]}
     * @memberof Profesor
     */
    public disponibilidad: Horario[];
    /**
     * @description correo de contacto del profesor
     * @type {string}
     * @memberof Profesor
     */
    public correo: string;

    /**
     * @description Crea una instancia de profesor
     * @param id id del profesor
     * @param nombre nombre del profesor
     * @param correo correo del profesor
     * @param disponibilidad disponibilidad del profesor
     */
    constructor(id: string, nombre: string, correo: string, disponibilidad: any[]) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.disponibilidad = disponibilidad;
    }
}
