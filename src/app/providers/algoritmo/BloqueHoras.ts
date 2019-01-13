import { Dias, Preferencia, BloqueInicio, BloqueFin } from './enum';
export class BloqueHoras {
    public dia: Dias;
    public inicio: BloqueInicio;
    public fin: BloqueFin;
    public prioridad?: Preferencia;

    constructor(dia: Dias, inicio: BloqueInicio, fin: BloqueFin, prioridad?: Preferencia) {
        this.dia = dia;
        this.inicio = inicio;
        this.fin = fin;
        if ( prioridad != null) {
            this.prioridad = prioridad;
        }
    }

}


