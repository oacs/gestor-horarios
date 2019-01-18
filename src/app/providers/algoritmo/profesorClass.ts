import { BloqueHoras } from './BloqueHoras';
import { stringToBloqueHoras, stringToDisponibilidad } from '../databaseTransalations/stringToData';

export class ProfesorClass {
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
    public id: number;
    /**
     * @description disponibilidad del profesor en arreglo de enum
     * @type {BloqueHoras[]}
     * @memberof Profesor
     */
    public disponibilidad: BloqueHoras[];
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
    constructor(id: number, nombre: string, correo: string, disponibilidad: string | BloqueHoras[]) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        if (typeof (disponibilidad) === 'string') {
            this.disponibilidad = stringToDisponibilidad(disponibilidad);
        } else {
            this.disponibilidad = disponibilidad;
        }
    }

}
