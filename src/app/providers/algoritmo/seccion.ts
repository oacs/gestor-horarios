import { Profesor } from "./profesor";
import { Horario } from "./interface";

export class Seccion {
    /**
     * @description id de la seccion generado
     * @memberof Seccion
     */
    public id: string;
    /**
     * @description horario final de la seccion en bloques de horas
     * @memberof Seccion
     */
    public horarioFinal: Horario[];
    /**
     * @description profesor que da clases en esta seccion
     * @memberof Seccion
     */
    public profesor: Profesor;
    /**
     * @description posiciones posibles para bloques de clases
     * @memberof Seccion
     */
    public horarioPosible: Horario[];

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
