import { Disponibilidad } from './disponibilidad';
import { Salon } from './salon';
import { HORAS } from './horas.enum';
import { DIAS } from './dias.enum';

export class Clase extends Disponibilidad {
  public salon: Salon;

  private _duracionDeClase: number;
  private _horaDeClase: number;
  private _diaDeClase: number;

  private constructor(salonIn: Salon, dia: number, hora: number, duracion: number) {
    super();
    this.salon = salonIn;
    this.setWeekOnes();


    this._horaDeClase = hora;
    this._diaDeClase = dia;
    this._duracionDeClase = duracion;

    for (let HorasDeClase = 0; HorasDeClase < duracion; HorasDeClase++) {
      this.setHora(dia, hora + HorasDeClase, 0.0);
    }
  }

  public static ClaseFactory(salonIn: Salon, dia: number, hora: number, duracion: number): Clase | undefined {
    if ((hora + duracion <= salonIn.horasLength()) && (hora + duracion >= 0)) {
      if ((dia < salonIn.diasLength()) && (dia >= 0)) {
        if (0.0 !== salonIn.getHoras(dia, hora, duracion)) {
          return new Clase(salonIn, dia, hora, duracion);
        }
      }
    }
    return undefined;
  }

  public duracionDeLaClase(): number {
    return this._duracionDeClase;
  }

  public horaDeLaClase(): number {
    return this._horaDeClase;
  }

  public diaDeLaClase(): number {
    return this._diaDeClase;
  }

  public getHorarioString(): string {
    let horasStr = '';

    for (let HorasDeClase = 0; HorasDeClase < this.duracionDeLaClase(); HorasDeClase++) {
      if (horasStr === '') {
        horasStr += HORAS[this.horaDeLaClase()];
      } else {
        if (HorasDeClase > 0) {
          const horaFin: number = this.horaDeLaClase() + HorasDeClase;
          let horaIniStr: string;
          let horaFinStr: string;

          horaIniStr = horasStr.trim().slice(0, horasStr.indexOf('-') - 2).trim();
          horaFinStr = HORAS[horaFin].trim().slice(HORAS[horaFin].indexOf('-')).trim();

          horasStr = ' ' + horaIniStr + ' a ' + horaFinStr + ' ';
        }
      }
    }

    return DIAS[this.diaDeLaClase()] + '(' + horasStr + ')';
  }

  public toString(): string {
    let str = '';

    str += this.tituloToString() + '\n' + super.toString();

    return str;
  }

  /**
   * tituloToString
   * return titulo con Info de la clase
   */
  public tituloToString(): string {
    return 'salon: ' + this.salon.code + ', ' + this.getHorarioString();
  }
}
