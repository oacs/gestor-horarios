import { Materia } from './materia';


export class Pensum {
  public nombre: string;

  private materias: Materia[][];

  public constructor(nombre: string, semestres: Number) {
    this.nombre = nombre;
    this.materias = [];

    for (let semIndex = 0; semIndex < semestres; semIndex++) {
      this.materias.push([]);
    }
  }


  public addMateria(materiaIn: Materia) {
    this.materias[materiaIn.semestre].push(materiaIn);
  }

  /**
   * getMateriaByNombre
   * retorna la materia con el nombre dado, o undefined
   */
  public getMateriaByNombre(nombre: string): Materia | undefined {
    for (let semestreIndex = 0; semestreIndex < this.materias.length; semestreIndex++) {
      for (let materiaIndex = 0; materiaIndex < this.materias[semestreIndex].length; materiaIndex++) {
        if (nombre === this.materias[semestreIndex][materiaIndex].nombre) {
          return this.materias[semestreIndex][materiaIndex];
        }
      }
    }
    return undefined;
  }

  /**
   * getMateriasArrayCopy
   */
  public getMateriasArrayCopy(): Materia[][] {
    const materiasOut: Materia[][] = [];

    this.materias.forEach(semestre => {
      materiasOut.push([]);
      semestre.forEach(materia => {
        materiasOut[materiasOut.length - 1].push(materia);
      });

    });

    return materiasOut;
  }

  /**
   * getSemestresLength retorn (this.materias.length) es decir el numero de semestre -1
   */
  public getSemestresLength(): number {
    return this.materias.length;
  }

  public toString(): string {
    let outStr = '';

    this.materias.forEach((semestre, semestreIndex) => {
      outStr += (1 + semestreIndex) + '° Semestre:\n';
      semestre.forEach((materia, materiaIndex, semestreArray) => {
        outStr += '	' + materia.nombre + ' -> (' + materia.getPrelaString() + ')\n';
      });
    });

    return 'Pensum: ' + this.nombre + '\n' + outStr;
  }
}
