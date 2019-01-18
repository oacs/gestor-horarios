import { Dias, Preferencia, Hora } from './enum';
export class BloqueHoras {
    public dia: Dias;
    public inicio: Hora;
    public fin: Hora;
    public prioridad?: Preferencia;

    constructor(dia: Dias, inicio: Hora, fin: Hora, prioridad?: Preferencia) {
        this.dia = dia;
        this.inicio = inicio;
        this.fin = fin;
        if ( prioridad != null) {
            this.prioridad = prioridad;
        }
    }

}


