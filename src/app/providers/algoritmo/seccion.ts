import { Profesor } from './profesor';
import { BloqueHoras } from './BloqueHoras';

export class Seccion {
    /**
     * @description id de la seccion generado
     * @memberof Seccion
     */
    public id: string;
    /**
     * @description BloqueHoras final de la seccion en bloques de horas
     * @memberof Seccion
     */
    public BloqueHorasFinal: BloqueHoras[];
    /**
     * @description profesor que da clases en esta seccion
     * @memberof Seccion
     */
    public profesor: Profesor;
    /**
     * @description posiciones posibles para bloques de clases
     * @memberof Seccion
     */
    public BloqueHorasPosible: BloqueHoras[];

    /**
     * @description Crea una instancia de
     * @param {string} id id de la seccion
     * @memberof Seccion
     */
    constructor(id: string, profesor: Profesor) {
        this.id = id;
        this.BloqueHorasFinal = [];
        this.BloqueHorasPosible = [];
        this.profesor = profesor;
        this.profesor.disponibilidad.map(bloque => {
            this.BloqueHorasPosible.push(new BloqueHoras(bloque.dia, bloque.inicio, bloque.fin));
        });
    }

}
