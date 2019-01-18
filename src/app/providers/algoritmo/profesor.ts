import { BloqueHoras } from './BloqueHoras';
import { stringToBloqueHoras } from '../databaseTransalations/stringToData';

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
    constructor(id: string, nombre: string, correo: string, disponibilidad: string) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.disponibilidad = stringToBloqueHoras(disponibilidad);
    }

}
