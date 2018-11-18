import { DIAS } from './dias.enum';
import { HORAS } from './horas.enum';


export class Disponibilidad {
  private rejilla: number[][];

  public constructor() {
    this.rejilla = [];
    this.setWeekOnes();
  }

  public setWeekOnes() {
    this.rejilla = [];
    const DiasArray = Object.keys(DIAS).slice(Object.keys(DIAS).length / 2);
    const horasArray = Object.keys(HORAS).slice(Object.keys(HORAS).length / 2);

    DiasArray.forEach((dia, diaIndex) => {
      this.rejilla.push([]);
      horasArray.forEach((hora, horaIndex) => {
        this.rejilla[diaIndex].push(1.0);
      });
    });
  }

  /**
   * setTodoElDia actualiza todo un dia con el valor dado
   */
  public setTodoElDia(dia: number, disp: number) {
    for (let hora = 0; hora < this.rejilla[dia].length; hora++) {
      this.setHora(dia, hora, disp);
    }
  }

  public setWeekZeros() {
    this.rejilla = [];

    const DiasArray = Object.keys(DIAS).slice(Object.keys(DIAS).length / 2);
    const horasArray = Object.keys(HORAS).slice(Object.keys(HORAS).length / 2);

    DiasArray.forEach((dia, diaIndex) => {
      this.rejilla.push([]);
      horasArray.forEach( () => {
        this.rejilla[diaIndex].push(0.0);
      });
    });
  }

  public setHora(dia: number, hora: number, disp: number) {
    if ( (0 <= disp) && (disp <= 1) ) {
      this.rejilla[dia][hora] = disp;
    }

  }

  public addHora(dia: number, hora: number, disp: number) {
    if ( (0 <= disp) && (disp <= 1) ) {
      this.rejilla[dia][hora] *= disp;
    }
  }

  public addDisp(dispIn: Disponibilidad): Disponibilidad {
    for (let dia = 0; dia < this.rejilla.length; dia++) {
      for (let hora = 0; hora < this.rejilla[dia].length; hora++) {
        this.rejilla[dia][hora] *= dispIn.getHora(dia, hora);
      }
    }
    return this;
  }

  public getHora(dia: number, hora: number): number {
    return this.rejilla[dia][hora];
  }

  /**
   * setHoras
   */
  public setHoras(dia: number, hora: number, duracion: number, disp: number) {
    if ( !((hora + duracion) > this.horasLength()) ) {
      for (let horasDeClase = 0; horasDeClase < duracion; horasDeClase++) {
        this.setHora(dia, hora + horasDeClase, disp);
      }
    }
  }

  public getHoras(dia: number, hora: number, duracion: number): number {
    let disp = 1.0;
    if ( (hora + duracion) > this.horasLength()) {
      return 0.0;
    }
    for (let horasDeClase = 0; horasDeClase < duracion; horasDeClase++) {
      disp *= this.getHora(dia, hora + horasDeClase);
    }
    return disp;
  }

  public diasLength(): number {
    return this.rejilla.length;
  }

  public horasLength(): number {
    return this.rejilla[0].length;
  }

  public toString(): string {
    let str = '';

    const diasArray = Object.keys(DIAS).slice(Object.keys(DIAS).length / 2);
    const horasArray = Object.keys(HORAS).slice(Object.keys(HORAS).length / 2);

    let margin = '';
    for (let index = 0; index < HORAS[0].length; index++) {
      margin += ' ';
    }
    let padding = '';
    let paddingLength = 0;
    for (let index = 0; index < diasArray.length; index++) {
      if (paddingLength < diasArray[index].length) { paddingLength = diasArray[index].length; }
    }

    for (let index = 0; index < paddingLength; index++) {
      padding += ' ';
    }
    str += margin + '|';

    diasArray.forEach((dia, diaIndex) => {
      str += ' ' + (dia + padding).slice(0, padding.length) + ' |';
    });
    str += '\n';
    horasArray.forEach((hora, horaIndex) => {
      str += hora + '|';
      diasArray.forEach((Dia, diasIndex) => {

        str += ' ' + (padding + this.rejilla[diasIndex][horaIndex]).slice(-padding.length) + ' |';
      });
      str += '\n';
    });

    return str;
  }

  /**
   * Negativo retorna un Disp donde cada valor es 1 - (lo que habia)
   */
  public complemento(): Disponibilidad {
    const negativo: Disponibilidad = new Disponibilidad();
    negativo.setWeekOnes();

    for (let diaIndex = 0; diaIndex < this.rejilla.length; diaIndex++) {
      for (let horaIndex = 0; horaIndex < this.rejilla[diaIndex].length; horaIndex++) {

        negativo.addHora(diaIndex, horaIndex, 1.0 - this.rejilla[diaIndex][horaIndex]);
      }
    }

    return negativo;
  }


  /**
   * general returno el multiplicade todos los elementos es decir si es
   */
  public getSiTodosSonCeros(): boolean {
    let general = 0.0;

    for (let diaIndex = 0; diaIndex < this.rejilla.length; diaIndex++) {
      for (let horaIndex = 0; horaIndex < this.rejilla[diaIndex].length; horaIndex++) {
        general += this.rejilla[diaIndex][horaIndex];
      }
    }

    return general === 0;
  }

  /**
   * comparar comprueba si concuerda algo de disp con la Disponibilidad dada
   */
  public comparar(dispIn: Disponibilidad): boolean {
    for (let diaIndex = 0; diaIndex < this.rejilla.length; diaIndex++) {
      for (let horaIndex = 0; horaIndex < this.rejilla[diaIndex].length; horaIndex++) {
        if (dispIn.getHora(diaIndex, horaIndex) !== this.getHora(diaIndex, horaIndex) ) {
          if ( !(dispIn.getHora(diaIndex, horaIndex) > 0 && this.getHora(diaIndex, horaIndex) > 0) ) {
            return false;
          }
        }
      }
    }
    return true;
  }
}


