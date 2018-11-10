import { Cronograma } from './cronograma';
import { Materia } from './materia';
import { Profesor } from './profesor';
import { Clase } from './clase';


export class Seccion {

  public code: string;
  public cronograma: Cronograma;
  public materia: Materia;
  public profesor: Profesor;

  public clases: Clase[];

  constructor(code: string, cronogramaIn: Cronograma, materia: Materia, profesor: Profesor) {
    this.code = code;
    this.cronograma = cronogramaIn;
    this.materia = materia;
    this.profesor = profesor;

    this.clases = [];
  }

  public getHorasAsignadas(): number {
    let count = 0;
    this.clases.forEach(clase => {
      count += clase.duracionDeLaClase();
    });
    return count;
  }

  public toString(): string {
    let str = '';

    str += 'materia: ' + this.materia.nombre + ' [' + this.code + ']\n' +
      'Profesor: ' + this.profesor.nombre + '\n' +
      'horas Asignadas: ' + this.getHorasAsignadas() + ' de ' + this.materia.horasDeClase() + ' Horas';

    this.clases.forEach(clase => {
      str += ' \n	' + clase.getHorarioString() + ': ' + clase.salon.code;
    });

    return str + '\n';
  }

  /**
   * getDescripcionString
   */
  public getDescripcionString(): string {
    return this.getDescripcionTituloString() + this.getDescipcionClasesString();
  }

  /**
   * getDescripcionTituloString
   */
  public getDescripcionTituloString(): string {
    return (
      this.materia.nombre + '[' + this.code + '] Prof.' +
      this.profesor.nombre + '\n' +
      '   Clases: horas ' + this.getHorasAsignadas() + ' de ' + this.materia.horasDeClase() + '\n'
    );
  }

  /**
   * getDescipcionClasesString
   */
  public getDescipcionClasesString(margin?: string): string {
    let strOut = '';

    this.clases.forEach((clase, claseIndex, clasesArray) => {
      strOut += margin + clase.getHorarioString() + ': ' + clase.salon.code;
      if (claseIndex < clasesArray.length) {
        strOut += '\n';
      }
    });

    return strOut;
  }
}
