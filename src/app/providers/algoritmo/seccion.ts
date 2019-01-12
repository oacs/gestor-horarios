import { Profesor } from "./profesor";

export class Seccion {
    /**
     * @description id de la seccion generado
     * @type {string}
     * @memberof Seccion
     */
    public id: string;
    /**
     * @description horario final de la seccion en bloques de horas
     * @type {any[]}
     * @memberof Seccion
     */
    public horarioFinal: any[];
    /**
     * @description profesor que da clases en esta seccion
     * @type {Profesor}
     * @memberof Seccion
     */
    public profesor: Profesor;
    /**
     * @description posiciones posibles para bloques de clases
     * @type {any[]}
     * @memberof Seccion
     */
    public horarioPosible: any[];

    /**
     * @description Crea una instancia de
     * @param {string} id id de la seccion
     * @memberof Seccion
     */
    constructor(id: string) {
        this.id = id;
        this.horarioFinal = [];
        this.horarioPosible = [];
        this.profesor = {} as Profesor;
    }
}
