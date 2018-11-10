import { Disponibilidad } from './disponibilidad';

export class Profesor extends Disponibilidad {

  public nombre: string;

  public constructor(nombre: string) {
    super();
    this.nombre = nombre;
    this.setWeekZeros();
  }

  public toString(): string {
    return 'Prof.' + this.nombre + '\n' + super.toString();
  }
}
