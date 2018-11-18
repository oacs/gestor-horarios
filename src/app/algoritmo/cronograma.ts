import { Disponibilidad } from './disponibilidad';
import { Pensum } from './pensum';
import { Seccion } from './seccion';
import { Materia } from './materia';
import { Profesor } from './profesor';
import { Salon } from './salon';
import { Clase } from './clase';

export class Cronograma {
  public nombre: string;
  public pensum: Pensum;

  private secciones: Seccion[];

  public constructor(nombre: string, pensum: Pensum) {
    this.nombre = nombre;
    this.pensum = pensum;

    this.secciones = [];
  }

  /**
   * ToString
   * Retorna string con Info del cronogrma tipado para consola
   */
  public ToString(): string {
    return 'Cronograma: ' + this.nombre + ', Pensum:' + this.pensum.nombre + '\n' +
      this.getSeccionToString();
  }

  /**
   * getSeccionToString
   * Retorna string con las secciones en ordenadas por semestre tipado para consola
   */
  public getSeccionToString(cruce?: boolean): string {
    let seccionesStr = '';
    const materiasArr = this.pensum.getMateriasArrayCopy();

    for (let semestreIndex = 0; semestreIndex < materiasArr.length; semestreIndex++) {
      seccionesStr += (semestreIndex + 1) + '° Semestre\n';
      if (cruce) { seccionesStr += this.getCruceSemestre(semestreIndex + 1).toString() + '\n'; }

      for (let materiaIndex = 0; materiaIndex < materiasArr[semestreIndex].length; materiaIndex++) {
        seccionesStr += '  ' + materiasArr[semestreIndex][materiaIndex].nombre + '\n';

        for (let seccionesIndex = 0; seccionesIndex < this.secciones.length; seccionesIndex++) {
          const elementSeccion = this.secciones[seccionesIndex];
          if (elementSeccion.materia === materiasArr[semestreIndex][materiaIndex]) {
            seccionesStr += '    Seccion: [' + elementSeccion.code + ']';
            seccionesStr += ' Prof.' + elementSeccion.profesor.nombre;
            seccionesStr += ' (' + elementSeccion.getHorasAsignadas();
            seccionesStr += '/' + elementSeccion.materia.horasDeClase() + ')';
            if (elementSeccion.getHorasAsignadas() === elementSeccion.materia.horasDeClase()) {
              seccionesStr += '*';
            }
            seccionesStr += '\n' + elementSeccion.getDescipcionClasesString('      ');

            if (seccionesIndex < this.secciones.length - 1) {
              seccionesStr += '\n';
            }
          }
        }

      }

    }


    return seccionesStr;
  }

  /**
   * seccionesDelProfefor retorna un arreglo del secciones del cual el profesor esta asignado
   */
  public getSeccionesDelProfefor(prof: Profesor): Seccion[] {
    const seccionesOut: Seccion[] = [];

    for (let materiaIndex = 0; materiaIndex < this.secciones.length; materiaIndex++) {
      if (this.secciones[materiaIndex].profesor === prof) {
        seccionesOut.push(this.secciones[materiaIndex]);
      }
    }

    return seccionesOut;
  }

  /**
   * AddSeccion: agrega una seccion, el numero de error de checkAddSeccion();
   */
  public AddSeccion(code: string, materia: string, prof: Profesor): number {
    const flag: number = this.checkAddSeccion(code, materia, prof);
    if (!flag) {
      const materiaIn = this.pensum.getMateriaByNombre(materia);
      if (materiaIn) {
        const seccionIn: Seccion = new Seccion(code, this, materiaIn, prof);
        this.secciones.push(seccionIn);
      }
    }
    return flag;
  }

  /**
   * getSecciones retorna el arreglo de las secciones (WARNING: si haces modificas unas seccion
   * puedes roperlo todo cuidao ahí)
   */
  public getSecciones(): Seccion[] {
    return this.secciones;
  }

  /**
   * checkAddSeccion Verifica si es posible añadir la seccion dada
   */
  public checkAddSeccion(code: string, materia: string, prof: Profesor): number {
    if (!this.pensum.getMateriaByNombre(materia)) {
      return 1;
    } // materia es Undefined, no se encuertra en el Pensum del cronograma
    if (code === '') {
      return 2;
    } // codigo de seccion está vacio ""

    return 0; // Sin Errores
  }

  /**
   * getCruceProf returna la Disponibilidad (Objeto) resultante de un
   * profesor dada por el cruce de las clases de sus secciones
   */
  public getCruceProf(prof: Profesor): Disponibilidad {
    const CruceDisp: Disponibilidad = new Disponibilidad();
    CruceDisp.setWeekOnes();

    CruceDisp.addDisp(prof);

    const profsSecciones: Seccion[] = this.getSeccionesDelProfefor(prof);

    for (let seccionesIndex = 0; seccionesIndex < profsSecciones.length; seccionesIndex++) {
      const seccion = profsSecciones[seccionesIndex];
      for (let claseIndex = 0; claseIndex < seccion.clases.length; claseIndex++) {
        const clase = seccion.clases[claseIndex];
        CruceDisp.addDisp(clase);
      }
    }

    return CruceDisp;
  }

  /**
   * getCruceSalon returna la Disponibilidad (Objeto) resultante de un
   * salon dada por el cruce de las clases de sus secciones
   */
  public getCruceSalon(salonIn: Salon): Disponibilidad {
    const CruceDisp: Disponibilidad = new Disponibilidad();
    CruceDisp.setWeekOnes();

    CruceDisp.addDisp(salonIn);

    for (let seccionesIndex = 0; seccionesIndex < this.secciones.length; seccionesIndex++) {
      for (let clasesIndex = 0; clasesIndex < this.secciones[seccionesIndex].clases.length; clasesIndex++) {
        if (this.secciones[seccionesIndex].clases[clasesIndex].salon === salonIn) {
          CruceDisp.addDisp(this.secciones[seccionesIndex].clases[clasesIndex]);
        }
      }
    }

    return CruceDisp;
  }

  /**
   * getSeccion Obtines el objeto Seccion del code dado de la materia del nombre dado,
   * sino devuelve undifined
   */
  public getSeccionByNames(nombreMateria: string, codeSeccion: string): Seccion | undefined {
    let seccion: Seccion | undefined;
    for (let seccionesIndex = 0; seccionesIndex < this.secciones.length; seccionesIndex++) {
      if (
        this.secciones[seccionesIndex].code === codeSeccion
        && this.secciones[seccionesIndex].materia.nombre === nombreMateria) {
        seccion = this.secciones[seccionesIndex];
      }
    }
    return seccion;
  }

  /**
   * CheckAddClase verifica si es posible agregar una clase a la seccion,
   * recive son los nombre de la materia
   */
  public checkAddClaseByName(nombreMateria: string, codeSeccion: string, claseIn: Clase): number {
    return this.checkAddClase(this.getSeccionByNames(nombreMateria, codeSeccion), claseIn);
  }

  /**
   * checkAddClase verifica si es posible agregar una clase a la seccion,
   * recive son los nombre de la materia
   */
  public checkAddClase(seccionIn: Seccion | undefined, claseIn: Clase, print?: boolean): number {

    const complemento: Disponibilidad = new Disponibilidad();
    let dispFinal = new Disponibilidad;

    if (print) { console.log('>>> IN CHECK <<<\n'); }
    // integridad del objeto seccion
    if (!seccionIn) {
      return 1; // secccion es Undefined
    } else {
      if (-1 === this.secciones.indexOf(seccionIn)) {
        return 2; // La seccion no existe el el cronograma
      }
    }

    if (seccionIn.materia.horasDeClase() < (seccionIn.getHorasAsignadas() + claseIn.duracionDeLaClase())) {
      return 3; // la horas asignadas a la clase exeden a las horas por asignar
    }

    if (claseIn.duracionDeLaClase() > seccionIn.materia.maxHorasXClase()) {
      return 4; // la clase es muy larga para esta materia
    }

    // Disponibilidad Prof.
    if (print) { console.log('> Disponibilidad Prof.\n'); }

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log(
        'Cruce del Prof. ' + seccionIn.profesor.nombre + '\n'
        + this.getCruceProf(seccionIn.profesor).toString()
      );
    }

    complemento.addDisp(this.getCruceProf(seccionIn.profesor));

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }

    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< chocan con el horario del profesor\n'); }
    } else {
      if (print) {
        console.log('       chocan con el horario del profesor\n');
      }
      return 5; //   SI!  chocan con el horario del profesor
    }


    // choque con el salon
    if (print) { console.log('> Disponibilidad Salon.\n'); }

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log(
        'Cruce del salon: ' + claseIn.salon.code + '\n'
        + this.getCruceSalon(claseIn.salon).toString()
      );
    }

    complemento.addDisp(this.getCruceSalon(claseIn.salon));

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }
    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< chocan con el horario del Salon\n'); }
    } else {
      if (print) {
        console.log('       chocan con el horario del Salon\n');
      }
      return 6; //   SI!  chocan con el horario del Salon
    }

    // choque de clases el mismo dia
    if (print) { console.log('>  Disponibilidad por clases el mismo dia\n'); }

    dispFinal = this.getCrucePorClaseElMismoDia(seccionIn);

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log('dispFinal de la seccion: \n' + dispFinal.toString());
    }

    complemento.addDisp(dispFinal);

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }

    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< hay clases el mismo dia\n'); }
    } else {
      if (print) {
        console.log('       hay clases el mismo dia\n');
      }
      return 7; //   SI!  hay clases el mismo dia
    }

    // choque con materias de semestre actual

    if (print) { console.log('> Disponibilidad por materias del semestre actual.\n'); }

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log(
        'Cruce del semestre actual: ' + (seccionIn.materia.semestre + 1) + '°\n'
        + this.getCruceSemestre((seccionIn.materia.semestre + 1)).toString()
      );
    }

    complemento.addDisp(this.getCruceSemestre((seccionIn.materia.semestre + 1), seccionIn.materia));

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }
    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< chocan con materias del semestre actual.\n'); }
    } else {
      if (print) {
        console.log('       chocan con materias del semestre actual.\n');
      }
      return 8; //   SI!  chocan con materias del semestre actual.
    }
    // choque con materias de semestre anterior

    if (print) { console.log('> Disponibilidad por materias del semestre anterior.\n'); }

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log(
        'Cruce del semestre anterior: ' + (seccionIn.materia.semestre) + '°\n'
        + this.getCruceSemestre((seccionIn.materia.semestre)).toString()
      );
    }

    complemento.addDisp(this.getCruceSemestre((seccionIn.materia.semestre)));

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }
    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< chocan con materias del semestre anterior.\n'); }
    } else {
      if (print) {
        console.log('       chocan con materias del semestre anterior.\n');
      }
      return 9; //   SI!  chocan con materias del semestre anterior.
    }

    // choque con materias de semestre siguiente

    if (print) { console.log('> Disponibilidad por materias del semestre siguiente.\n'); }

    complemento.setWeekOnes();
    complemento.addDisp(claseIn.complemento());

    if (print) {
      console.log('Complemento de la clase: \n' + complemento.toString());
      console.log(
        'Cruce del semestre siguiente: ' + (seccionIn.materia.semestre + 2) + '°\n'
        + this.getCruceSemestre((seccionIn.materia.semestre + 2)).toString()
      );
    }

    complemento.addDisp(this.getCruceSemestre((seccionIn.materia.semestre + 2)));

    if (print) { console.log('complemento post addDisp:\n' + complemento.toString()); }
    if (complemento.comparar(claseIn.complemento())) {
      if (print) { console.log('>>NO<< chocan con materias del semestre siguiente.\n'); }
    } else {
      if (print) {
        console.log('       chocan con materias del semestre siguiente.\n');
      }
      return 10; //   SI!  chocan con materias del semestre siguiente.
    }



    // Fin comprobacion
    if (print) { console.log('>>> OUT CHECK <<<\n'); }
    return 0; // Sin Errores
  }

  /**
   * addClase, el numero de error de CheckAddClase()
   */
  public addClaseByNames(nombreMateria: string, codeSeccion: string, claseIn: Clase, ): number {
    const flag: number = this.checkAddClaseByName(nombreMateria, codeSeccion, claseIn);
    if (!flag) {
      const seccion: Seccion | undefined = this.getSeccionByNames(nombreMateria, codeSeccion);
      if (seccion) { seccion.clases.push(claseIn); }
    }

    return flag;
  }

  /**
   * getCruceSemestreAnterior obtines la disponibilidad por las materias del semestre dado
   */
  public getCruceSemestre(semestre: number, materiaIn?: Materia): Disponibilidad {
    const dispFinal: Disponibilidad = new Disponibilidad;
    // console.log(0 + "<" + semestre + "<" + (this.pensum.getSemestresLength()));
    if (0 < semestre && semestre < (this.pensum.getSemestresLength() + 1)) {
      semestre--;
      for (let seccionesIndex = 0; seccionesIndex < this.secciones.length; seccionesIndex++) {
        if (this.secciones[seccionesIndex].materia.semestre === semestre) {
          if (materiaIn !== this.secciones[seccionesIndex].materia) {
            for (let clasesIndex = 0; clasesIndex < this.secciones[seccionesIndex].clases.length; clasesIndex++) {
              dispFinal.addDisp(this.secciones[seccionesIndex].clases[clasesIndex]);
            }
          }
        }
      }
    }
    return dispFinal;
  }

  /**
   * AddClass añade un clase a la seccion dada, retorna el numero de error de CheckAddClase()
   */
  public addClase(seccionIn: Seccion, claseIn: Clase, print?: boolean): number {
    const flag: number = this.checkAddClase(seccionIn, claseIn, print);
    if (!flag) {
      seccionIn.clases.push(claseIn);
    }

    return flag;
  }

  /**
   * getCrucePorClaseElMismoDia retorna una disponibilidad con 0 en todo el dia los dia que
   * tenga clase
   */
  public getCrucePorClaseElMismoDia(seccionIn: Seccion): Disponibilidad {
    const dispFinal: Disponibilidad = new Disponibilidad();
    dispFinal.setWeekOnes();
    for (let clasesIndex = 0; clasesIndex < seccionIn.clases.length; clasesIndex++) {
      dispFinal.setTodoElDia(seccionIn.clases[clasesIndex].diaDeLaClase(), 0.0);
    }
    return dispFinal;
  }

}

/*

// esto regresa la disponibilidad final para inserta una clase

console.log(
  dispFinal
  .addDisp(crngm.getCruceProf(sccns[6].profesor)) // 5
  .addDisp(crngm.getCruceSalon(slns[1])) // 6
  .addDisp(crngm.getCrucePorClaseElMismoDia(sccns[6])) // 7
  .addDisp(crngm.getCruceSemestre(sccns[6].materia.semestre + 1)) // 8
  .addDisp(crngm.getCruceSemestre(sccns[6].materia.semestre)) // 9
  .addDisp(crngm.getCruceSemestre(sccns[6].materia.semestre + 2)) // 10
  .toString()
);

*/
