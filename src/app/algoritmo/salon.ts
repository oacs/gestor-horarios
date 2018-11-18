import { Disponibilidad } from './disponibilidad';


export class Salon extends Disponibilidad {

  public code: string;

  public constructor(code: string) {
    super();
    this.code = code;
  }

  public toString(): string {
    return 'Salon: ' + this.code + '\n' + super.toString();
  }
  
}
