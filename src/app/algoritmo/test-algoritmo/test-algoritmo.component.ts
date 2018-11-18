import { Component, OnInit } from '@angular/core';
import { Pensum } from '../pensum';
import { Materia } from '../materia';
import { Cronograma } from '../cronograma';
import { Seccion } from '../seccion';
import { Profesor } from '../profesor';
import { Clase } from '../clase';
import { Salon } from '../salon';
import { DIAS } from '../dias.enum';
import { HORAS } from '../horas.enum';
import { Disponibilidad } from '../disponibilidad';

@Component({
  selector: 'app-test-algoritmo',
  templateUrl: './test-algoritmo.component.html',
  styleUrls: ['./test-algoritmo.component.scss']
})
export class TestAlgoritmoComponent implements OnInit {
  private consoleStr: string;
  constructor() {

    const pnsm: Pensum = new Pensum('Prescolar', 5);
    const crngm: Cronograma = new Cronograma('2018', pnsm);

    const materias: Materia[] = [];
    const profs: Profesor[] = [];
    const slns: Salon[] = [];
    let sccns: Seccion[] = [];

    let stringErrorOut = '';

    let clsIn: Clase | undefined;
    let clsFg: number;

    const ERRORSCHECKADDCLASS: string[] = [
      'Inserción EXITOSA',
      'ERROR N°  1: secccion es Undefined',
      'ERROR N°  2: La seccion no existe el el cronograma',
      'ERROR N°  3: la horas asignadas a la clase exeden a las horas por asignar',
      'ERROR N°  4: la clase es muy larga para esta materia',
      'ERROR N°  5: chocan con el horario del profesor',
      'ERROR N°  6: chocan con el horario del Salon',
      'ERROR N°  7: hay clases el mismo dia',
      'ERROR N°  8: chocan con materias del semestre actual.',
      'ERROR N°  9: chocan con materias del semestre anterior.',
      'ERROR N° 10: chocan con materias del semestre siguiente.'
    ];

    // esta funcion esta para facilitar la Impresion en consolo no es necesaria en el algoridmo
    function insetClass(diaIn: number, horaIn: number, DuracionIn: number, sccnIn: Seccion, salonIn?: Salon) {
      clsIn = Clase.ClaseFactory(diaIn, horaIn, DuracionIn,salonIn); // <- Así se crea una clase
      if (clsIn) {
        // ↓↓↓ Así se agrega la clase, se guarda el numero de error para impremirlo
        clsFg = crngm.addClase(sccnIn, clsIn);
        stringErrorOut += (
          '<p>insertando: ' + clsIn.getHorarioString() + ': ' + clsIn.salon.code +
          ' >> ' + sccnIn.materia.nombre + '[' + sccnIn.code + '] ' + sccnIn.profesor.nombre + '</p>'
        );
        stringErrorOut += ('<p> >> ' + ERRORSCHECKADDCLASS[clsFg] + '</p>');
      }
    }
    // Crear Materia
    // se guardas en un Arreglo aparte para fasilitar la insercion
    materias.push(new Materia('plastilina 1', 1, 4, 2)); // [0]
    materias.push(new Materia('plastilina 2', 2, 4, 2)); // [1]
    materias.push(new Materia('plastilina 3', 3, 4, 2)); // [2]
    materias.push(new Materia('plastilina 4', 4, 4, 2)); // [3]
    materias.push(new Materia('plastilina 5', 5, 5, 2)); // [4]
    materias.push(new Materia('Manualidades 1', 2, 5, 2)); // [5]
    materias.push(new Materia('Manualidades 2', 3, 5, 3)); // [6]
    materias.push(new Materia('Manualidades 3', 4, 6, 3)); // [7]
    materias.push(new Materia('Humanidades 1', 1, 4, 2)); // [8]
    materias.push(new Materia('Humanidades 2', 3, 4, 2)); // [9]

    materias.forEach(materia => {
      pnsm.addMateria(materia); // Añadir la materias al pensum
    });

    // Crear Profesores
    profs.push(new Profesor('Pedro Plastilina'));				// [0] Pedro Plastilina
    profs.push(new Profesor('Manuela Manualidades'));		// [1] Manuela Manualidade
    profs.push(new Profesor('Humberto Human'));					// [2] Humberto Human
    profs.push(new Profesor('Common Dintong'));					// [3] Common Dintong

    // Definicion de horarios de cada profesor

    // Pedro Plastilina  (solo todo el Lunes y la mañana de los Martes y Miercoles hasta la 01:00:00 PM)
    profs[0].setWeekZeros();
    profs[0].setTodoElDia(DIAS.Lunes, 1.0);
    profs[0].setHoras(DIAS.Martes, HORAS['  7:00:00 AM -  8:00:00 AM '], 6, 1.0);
    profs[0].setHoras(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 56, 1.0);

    // Manuela Manualidade (todo los Lunes, Martes, y viernes de 07:00am a 04:00pm como 2° opcion)
    profs[1].setWeekZeros();
    profs[1].setTodoElDia(DIAS.Lunes, 1.0);
    profs[1].setTodoElDia(DIAS.Miercoles, 1.0);
    profs[1].setHoras(DIAS.Viernes, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 2);

    // Humberto Human (de Lunrtes a Viernes de 07:00am a 04:00pm con los Vierdos como 2° opcion)
    profs[2].setWeekOnes();
    profs[2].setHoras(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 1.0);
    profs[2].setHoras(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '] + 5, 14 - 5, 0.0);

    profs[2].setHoras(DIAS.Martes, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 1.0);
    profs[2].setHoras(DIAS.Martes, HORAS['  7:00:00 AM -  8:00:00 AM '] + 5, 14 - 5, 0.0);

    profs[2].setHoras(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 1.0);
    profs[2].setHoras(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '] + 5, 14 - 5, 0.0);

    profs[2].setHoras(DIAS.Jueves, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 1.0);
    profs[2].setHoras(DIAS.Jueves, HORAS['  7:00:00 AM -  8:00:00 AM '] + 5, 14 - 5, 0.0);

    profs[2].setHoras(DIAS.Viernes, HORAS['  7:00:00 AM -  8:00:00 AM '], 5, 2);
    profs[2].setHoras(DIAS.Viernes, HORAS['  7:00:00 AM -  8:00:00 AM '] + 5, 14 - 5, 0.0);

    // Common Dintong (de Lunes a Jueves todo el dia,los Viernes de 07:00am a 04:00pm todo como 2° opcion)
    profs[3].setWeekOnes();

    profs[3].setHoras(DIAS.Viernes, HORAS['  7:00:00 AM -  8:00:00 AM '], 9, 2);
    profs[3].setHoras(DIAS.Viernes, HORAS['  7:00:00 AM -  8:00:00 AM '] + 9, 14 - 9, 0.0);




    // Creacion de Salones

    slns.push(new Salon('Aula 01')); // [0] Aula 01
    slns.push(new Salon('Aula 02')); // [1] Aula 02
    slns.push(new Salon('Aula 03')); // [2] Aula 03
    slns.push(new Salon('Aula 04')); // [3] Aula 04

    // [2] Aula 03 tienes los Jueves y viernes cerrado
    slns[2].setTodoElDia(DIAS.Jueves, 0.0);
    slns[2].setTodoElDia(DIAS.Viernes, 0.0);


    // creacion del cronograma 2018 de Prescolar
    // creacion de secciones


    crngm.AddSeccion('01', 'plastilina 1', profs[0]);
    crngm.AddSeccion('02', 'plastilina 1', profs[3]);
    crngm.AddSeccion('01', 'Humanidades 1', profs[2]);

    crngm.AddSeccion('01', 'plastilina 2', profs[0]);
    crngm.AddSeccion('01', 'Manualidades 1', profs[1]);

    crngm.AddSeccion('01', 'plastilina 3', profs[0]);
    crngm.AddSeccion('01', 'Humanidades 2', profs[2]);
    crngm.AddSeccion('01', 'Manualidades 2', profs[1]);

    crngm.AddSeccion('01', 'plastilina 4', profs[0]);
    crngm.AddSeccion('01', 'Manualidades 3', profs[1]);

    crngm.AddSeccion('01', 'plastilina 5', profs[3]);

    sccns = crngm.getSecciones();

    //  i	  semestre		Materia					sccn		Profesor
    // [0]  (1° Smt)    plastilina 1    [01]    prof.Pedro Plastilina
    // [1]  (1° Smt)    plastilina 1    [02]    prof.Common Dintong
    // [2]  (1° Smt)    Humanidades 1   [01]    prof.Humberto Human
    // [3]  (2° Smt)    plastilina 2    [01]    prof.Pedro Plastilina
    // [4]  (2° Smt)    Manualidades 1  [01]    prof.Manuela Manualidades
    // [5]  (3° Smt)    plastilina 3    [01]    prof.Pedro Plastilina
    // [6]  (3° Smt)    Humanidades 2   [01]    prof.Humberto Human
    // [7]  (3° Smt)    Manualidades 2  [01]    prof.Manuela Manualidades
    // [8]  (4° Smt)    plastilina 4    [01]    prof.Pedro Plastilina
    // [9]  (4° Smt)    Manualidades 3  [01]    prof.Manuela Manualidades
    // [10] (5° Smt)    plastilina 5    [01]    prof.Common Dintong


    // Creacion y agregado de Clases
    // anadir clases al cronograma

    // IMPORTANTE!!!! la funccion insertClass no esta impliemntada en la clases del algoritmo
    // esta para facilitar la insersion en la prueba, chequear la definicion al principio del
    // de condigo para ver como se hace realmente.c

    // plastilina 1[01]
    insetClass(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[0], slns[0]);
    insetClass(DIAS.Lunes, HORAS['  9:00:00 AM - 10:00:00 AM '], 2, sccns[0], slns[0]);
    insetClass(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[0], slns[0]);

    // plastilina 1[02]
    insetClass(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[1], slns[0]);
    insetClass(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[1], slns[1]);
    insetClass(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[1], slns[1]);

    insetClass(DIAS.Martes, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[2], slns[0]);
    insetClass(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[2], slns[2]);
    insetClass(DIAS.Jueves, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[2], slns[0]);

    // plastilina 2[01]
    insetClass(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[3], slns[1]);
    insetClass(DIAS.Martes, HORAS['  7:00:00 AM -  8:00:00 AM '], 2, sccns[3], slns[1]);
    insetClass(DIAS.Lunes, HORAS['  7:00:00 AM -  8:00:00 AM '] + 2, 2, sccns[3], slns[1]);
    insetClass(DIAS.Miercoles, HORAS['  7:00:00 AM -  8:00:00 AM '] + 2, 2, sccns[3], slns[1]);

    insetClass(DIAS.Lunes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 3, sccns[4], slns[1]);
    insetClass(DIAS.Lunes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 2, sccns[4], slns[1]);
    insetClass(DIAS.Miercoles, HORAS[' 11:00:00 AM - 12:00:00 PM '], 2, sccns[4], slns[1]);
    insetClass(DIAS.Viernes, HORAS[' 11:00:00 AM - 12:00:00 PM '] - 1, 2, sccns[4], slns[1]);
    insetClass(DIAS.Viernes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 1, sccns[4], slns[1]);

    insetClass(DIAS.Lunes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 2, sccns[8], slns[2]);
    insetClass(DIAS.Martes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 2, sccns[8], slns[2]);

    insetClass(DIAS.Martes, HORAS[' 11:00:00 AM - 12:00:00 PM '], 1, sccns[6], slns[1]);
    insetClass(DIAS.Martes, HORAS['  9:00:00 AM - 10:00:00 AM '], 1, sccns[6], slns[1]);


    const clsOut: Clase | undefined = sccns[6].clases.splice(0)[0];
    if (clsOut) {
      stringErrorOut += '\n removienda clase: ' + clsOut.tituloToString() + '\n';
    }

    // insercion si difinir clase lo que hace es que se crea un salon con un nombre unico.
    insetClass(DIAS.Jueves, HORAS['  9:00:00 AM - 10:00:00 AM '], 2, sccns[10]);
    insetClass(DIAS.Viernes, HORAS['  9:00:00 AM - 10:00:00 AM '], 2, sccns[10]);
    insetClass(DIAS.Miercoles, HORAS['  9:00:00 AM - 10:00:00 AM '], 1, sccns[10]);

    this.consoleStr = stringErrorOut + (crngm.toString().replace(/\n/g, '<br>'));

    this.consoleStr += "<br>" + crngm.getCruceProf(profs[3]).toString().replace(/\n/g, '<br>');

  }



  ngOnInit() {
  }

}
