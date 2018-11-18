import { Disponibilidad } from './disponibilidad';


export class Materia extends Disponibilidad {

  public nombre: string;
  public semestre: number;

  private _horasDeClase: number;
  private _maxHorasXClase: number;

  private prela: Materia[];

  public constructor(nombre: string, semestre: number, horasDeClase: number, maxHorasXClase: number) {
    super();
    this.nombre = nombre;
    this.semestre = semestre - 1;
    this._horasDeClase = horasDeClase;
    this._maxHorasXClase = maxHorasXClase;

    this.prela = [];

    this.setWeekOnes();
  }

  public horasDeClase(): number {
    return this._horasDeClase;
  }
  public maxHorasXClase(): number {
    return this._maxHorasXClase;
  }

  public addPrela(MateriaPrelada: Materia): number {
    if (-1 === this.prela.indexOf(MateriaPrelada)) {
      this.prela.push(MateriaPrelada);
    }
    return this.prela.indexOf(MateriaPrelada);
  }

  public getPrelaString(): String {
    let str: String = '';
    for (let MateriaIndex = 0; MateriaIndex < this.prela.length; MateriaIndex++) {
      str += '' + this.prela[MateriaIndex].nombre;
      if (MateriaIndex < this.prela.length - 1) {
        if (MateriaIndex === this.prela.length - 2) {
          str += ' y ';
        } else {
          str += ', ';
        }
      } else {
        str += '';
      }
    }
    return str;
  }

  public toString(): string {
    let str = '';

    str += this.nombre + ', ' + (this.semestre + 1) + '° Semestre\n' +
      super.toString() + '\n' +
      'Prela a: ' + this.getPrelaString() + '\n';

    return str;

  }
}
