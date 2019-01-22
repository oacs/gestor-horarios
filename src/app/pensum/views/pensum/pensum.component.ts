import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PensumService, Pensum } from '../../../providers/pensum/pensum.service';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';
import { MateriasxpensumService } from '../../../providers/materiasxpensum/materiasxpensum.service';
import { ServicioOpcionesPensumService } from '../../../providers/servicioOpcionesPensum/servicio-opciones-pensum.service';
import { PrelacionService } from '../../../providers/prelacion/prelacion.service';

interface Semestre {
  numero: number;
  materias: Materia[];
}

@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

@NgModule({
  imports: [
    AngularFontAwesomeModule
  ]
})

export class PensumComponent implements OnInit {
  @ViewChild('contextMenu') contextMenu: ElementRef;

  public pensums: Pensum[];
  public pensumActivo: Pensum;
  public materias: Materia[];
  public info: Materia[];
  public limite: number;
  /**
   * @description guarda la posicion de comienzo del arreglo de info
   * @example materias: Materia[] = [ 0, 1, 2, 3, 4, 5]
   * y  limite: number = 2 por lo tanto se agrupan
   * de dos para pasar la informacion al hijo.
   * si posicion = 0 entonces info = [0, 1]
   * si posicion = 1 entonces info = [2, 3]
   * si posicion = n entonces info = [posicion * limite, (posicion * limite) + limite]
  */
  public posicion: number;
  public semestres: Semestre[];
  public materiasEnDrag: number;

  // Cestari con su modal chimbo
  public displayModalNuevo: string;
  public displayModalImportar: string;
  public displayModalModificar: string;

  public materiaForm: FormGroup;
  public updateMatterForm: FormGroup;
  public createPensumForm: FormGroup;
  public modifyPensumForm: FormGroup;


  public materiaTemporal: Materia;

  /* Asignacion de prelaciones y corequisitos */
  public asignandoRequisito: string;
  public materiaRequisitos: Materia;
  public indexSemestreMatReq: number;
  public indexMateriaMatReq: number;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.calcularLimiteMateriasAMostrar(event.target.innerWidth);
    this.actualizarInfo();
  }

  @HostListener('document:click', ['$event']) clickedOutside($event) {
    this.contextMenu.nativeElement.style.opacity = 0;
  }

  constructor(
    private pensumSevice: PensumService,
    private materiasService: MateriaService,
    private materiasxpensumService: MateriasxpensumService,
    private formModal: FormBuilder,
    private servicioOpcionesPensum: ServicioOpcionesPensumService,
    private prelacionService: PrelacionService
  ) {


    this.asignandoRequisito = '';
    this.materiaRequisitos = {
      id: -1,
      nombre: '',
      semestre: -1,
      prelaciones: [],
      corequisitos: []
    };
    this.indexMateriaMatReq = 0;
    this.indexSemestreMatReq = 0;

    this.pensumSevice.getPensums().subscribe(pensums => {
      this.pensums = pensums;
      console.log(pensums);
    });

    this.materiaForm = this.formModal.group({
      nombre: ['', Validators.required],
      // horas: ['', Validators.required],
      // horasMax: ['', Validators.required]
    });

    this.updateMatterForm = this.formModal.group({
      nombre: ['', Validators.required],
      // horas: ['', Validators.required],
      // horasMax: ['', Validators.required]
    });


    this.semestres = [
      { numero: 1, materias: [] },
      { numero: 2, materias: [] },
      { numero: 3, materias: [] },
      { numero: 4, materias: [] },
      { numero: 5, materias: [] },
      { numero: 6, materias: [] },
      { numero: 7, materias: [] },
      { numero: 8, materias: [] },
      { numero: 9, materias: [] },
      { numero: 10, materias: [] }];
    this.materias = [];

    this.displayModalNuevo = 'none';
    this.displayModalModificar = 'none';
  }

  /* Cambia el tipo de display (cuando se presiona alguno de los botones) */
  public toggleModal(idModal: string) {
    if (idModal === 'nuevaMateria') {
      if (this.displayModalNuevo === 'none') {
        this.displayModalNuevo = 'block';
      } else {
        this.displayModalNuevo = 'none';
      }
    }

    if (idModal === 'modificar') {
      if (this.displayModalModificar === 'none') {
        this.displayModalModificar = 'block';
      } else {
        this.displayModalModificar = 'none';
      }
    }
  }

  /* Retorna el tipo de display para aplicar ngStyle sobre el modal */
  public displayType(idModal: String) {
    if (idModal === 'nuevaMateria') {
      return this.displayModalNuevo;
    }

    if (idModal === 'modificar') {
      return this.displayModalModificar;
    }
  }

  submitFormNewMatter() {
    if (this.materiaForm.valid) {
      this.materiasService.insertMateria(this.materiaForm.value).subscribe(data => {
        if (data.id !== null) {
          const mat: Materia = this.materiaForm.value;
          mat.id = data.id;
          this.materias.unshift(mat);
          this.displayModalNuevo = 'none';
          this.actualizarInfo();
        }
      });
    }
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.actualizarInfo();
  }

  public cambiarInfo(event: string) {
    switch (event) {
      case 'left':
        if (this.posicion !== 0) {
          this.posicion--;
        }
        break;
      case 'right':
        if (this.posicion < (this.materias.length / this.limite) - 1) {
          this.posicion++;
        }
        break;
    }
    this.actualizarInfo();
  }

  private actualizarInfo() {
    const aux: Materia[] = [];
    this.semestres.forEach(semestre => {
      semestre.materias.forEach(materia => {
        materia.semestre = -1;
        aux.push(materia);
      });
    });
    const infoAux: Materia[] = this.materias.filter(mat => !aux.includes(mat));
    this.info = infoAux.slice(this.posicion * this.limite,
      (this.posicion * this.limite) + this.limite);
  }


  submitFormUpdateMatter() {
    if (this.updateMatterForm.valid) {
      this.materiasService.updateMateria(this.updateMatterForm.value, this.materiaTemporal.id).subscribe(data => {
        console.log(data);
        if (data === null) {
          this.materias[this.materias.indexOf(this.materiaTemporal)].nombre = this.updateMatterForm.value.nombre;

        }
      });
    }
  }

  // deleteMatter() {
  //   console.log(this.materiaTemporal);
  //   this.materiasService.deleteMateria(this.materiaTemporal).subscribe(data => {
  //     console.log(data);
  //     if (data === null) {
  //       this.materias.splice(this.materias.indexOf(this.materiaTemporal), 1);
  //       this.displayModalModificar = 'none';
  //     }
  //   });
  // }

  /*crearPensum() {
    if (this.createPensumForm.valid) {
      this.pensumSevice.insertPensum(this.createPensumForm.value).subscribe(data => {
        if (data.id !== null) {
          const pensumTemp: Pensum = this.createPensumForm.value;
          pensumTemp.id = data.id;
          this.pensums.push(pensumTemp);
          this.abrirPensum(data.id);
        }
      });
    }
  }*/


  /*modificarPensum() {
    console.log(this.modifyPensumForm.value);
    if (this.modifyPensumForm.valid) {
      this.abrirPensum(this.modifyPensumForm.value.option);
    }
  }*/

  guardarPensum() {
    this.pensumActivo = {} as Pensum;
    this.pensumActivo.id = 2;
    this.materiasxpensumService.deleteMateriaxpensumByPensum(2).subscribe(msj => {
      this.prelacionService.deleteprelacionByPensum(2).subscribe(msj3 => {
        this.semestres.forEach((semestre, i) => {
          semestre.materias.forEach((materia, j) => {
            this.materiasxpensumService.insertMateriaxpensum({
              id_materia: materia.id,
              id_pensum: 2,
              maxH: 0,
              horas: 0,
              semestre: semestre.numero
            }).subscribe(mensaje => {
              console.log(mensaje);
            });
            materia.prelaciones.forEach(prelacion => {
              this.prelacionService.insertprelacion(
                {
                  id_pensum: 2,
                  id_prelada: materia.id,
                  id_prelante: prelacion.id,
                  tipo: 0
                }).subscribe(msj2 => {
                  console.log(msj2);
                });
            });

            materia.corequisitos.forEach(correquisito => {
              this.prelacionService.insertprelacion(
                {
                  id_pensum: 2,
                  id_prelada: materia.id,
                  id_prelante: correquisito.id,
                  tipo: 1
                }).subscribe(msj2 => {
                  console.log(msj2);
                });
            });
          });
        });
        const aux: Materia[] = [];
        this.semestres.forEach(semestre => {
          semestre.materias.forEach(materia => {
            aux.push(materia);
          });
        });
        const infoAux: Materia[] = this.materias.filter(mat => !aux.includes(mat));
        infoAux.forEach(materia => {
          this.materiasxpensumService.insertMateriaxpensum({
            id_materia: materia.id,
            id_pensum: 2,
            maxH: 0,
            horas: 0,
            semestre: 0
          }).subscribe(mensaje => {
            console.log(mensaje);
          });
        });
      });
    });
    // console.log(JSON.stringify(this.semestres));
    // console.log(JSON.parse(JSON.stringify(this.semestres)));
  }

  cargarPensum() {
    this.materiasxpensumService.getMateriasxPensumId(2).subscribe(materiasxpensum => {
      materiasxpensum.forEach(materia => {
        console.log(materia.semestre);
        if (materia.semestre !== 0) {
          // this.semestres[materia.semestre - 1].materias.push(materia);
          this.materiasService.getPrelantes(materia.id, 2).subscribe(prelantes => {
            console.log(prelantes);
            const prelaciones: Materia[] = prelantes.filter(prelacion => prelacion.tipo === 0).map(prelacion => {
              return {
                id: prelacion.id_prelante,
                nombre: prelacion.nombre,
                semestre: prelacion.semestre
              };
            });
            const corequisitos: Materia[] = prelantes.filter(corequisito => corequisito.tipo === 1).map(prelacion => {
              return {
                id: prelacion.id_prelante,
                nombre: prelacion.nombre,
                semestre: prelacion.semestre
              };
            });
            console.log(materia);
            console.log(corequisitos);
            this.semestres[materia.semestre - 1].materias.push({
              nombre: materia.nombre,
              horas: materia.horas,
              id: materia.id,
              maxH: materia.maxH,
              semestre: materia.semestre,
              prelaciones: prelaciones,
              corequisitos: corequisitos
            });
            this.posicion = 0;
            this.calcularLimiteMateriasAMostrar(window.innerWidth);
            this.actualizarInfo();

          });
        } else {
          this.materiasService.getPrelantes(materia.id, 2).subscribe(prelantes => {
            const prelaciones: Materia[] = prelantes.filter(prelacion => prelacion.tipo === 0).map(prelacion => {
              return {
                id: prelacion.id_prelante,
                nombre: prelacion.nombre,
                semestre: prelacion.semestre
              };
            });
            const corequisitos: Materia[] = prelantes.filter(corequisito => corequisito.tipo === 1).map(prelacion => {
              return {
                id: prelacion.id_prelante,
                nombre: prelacion.nombre,
                semestre: prelacion.semestre
              };
            });
            console.log(corequisitos);
            this.materias.push({
              nombre: materia.nombre,
              horas: materia.horas,
              id: materia.id,
              maxH: materia.maxH,
              semestre: materia.semestre,
              prelaciones: prelaciones,
              corequisitos: corequisitos
            });
            this.posicion = 0;
            this.calcularLimiteMateriasAMostrar(window.innerWidth);
            this.actualizarInfo();

          });


        }
      });
    });
  }

  abrirPensum(id: number) {
    /* this.materiasxpensumService.getMateriasxPensumId(id).subscribe(materias => {
       console.log(materias);
       materias.forEach(materia => {
         this.semestres[materia.semestre].materias.push(materia);
       });
     });+*/
  }

  calcularLimiteMateriasAMostrar(width: number) {
    this.limite = ((width * 0.8) / 163) - 1;
  }


  /* GESTOR DE PRELACIONES */

  abrirContextMenu(event: any, indexS: number, indexM: number) {
    event.stopPropagation();
    this.contextMenu.nativeElement.style.left = event.pageX + 'px';
    this.contextMenu.nativeElement.style.top = event.pageY + 'px';
    this.contextMenu.nativeElement.style.opacity = '1';

    this.indexMateriaMatReq = indexM;
    this.indexSemestreMatReq = indexS;
    console.log(this.semestres[indexS].materias[indexM]);
  }

  abrirGestorRequisitos(req: string) {
    // this.materiaRequisitos = {} as Materia;
    const aux = this.semestres[this.indexSemestreMatReq].materias[this.indexMateriaMatReq];
    const prel = aux.prelaciones.slice();
    const core = aux.corequisitos.slice();
    this.materiaRequisitos = {
      id: aux.id,
      nombre: aux.nombre,
      semestre: aux.semestre,
      prelaciones: prel,
      corequisitos: core,
      horas: 0,
      maxH: 0,
    };
    this.materiaRequisitos.semestre = this.indexSemestreMatReq + 1;
    this.asignandoRequisito = req;
    console.log(this.semestres);
  }

  esPrelacionDe() {
    const materia = this.semestres[this.indexSemestreMatReq].materias[this.indexMateriaMatReq];
    let esPrelacion = false;
    this.materiaRequisitos.prelaciones.forEach(preladora => {
      if (preladora.id === materia.id) {
        esPrelacion = true;
        return;
      }
    });
    console.log(esPrelacion);
    return esPrelacion;
  }

  esCorequisitoDe() {
    let esCorequisito = false;
    const materia = this.semestres[this.indexSemestreMatReq].materias[this.indexMateriaMatReq];
    this.materiaRequisitos.corequisitos.forEach(corequisito => {
      if (corequisito.id === materia.id) {
        esCorequisito = true;
        return;
      }
    });
    return esCorequisito;
  }

  esPosiblePrelacion(indiceSemestre: number) {
    if (indiceSemestre + 1 < this.materiaRequisitos.semestre) {
      return true;
    } else {
      return false;
    }
  }

  getIndexPrelacion(indexSemestre: number, indexMateria: number): number {
    const index = this.materiaRequisitos.prelaciones
      .findIndex(materia => materia.id === this.semestres[indexSemestre].materias[indexMateria].id);
    return index;
  }

  getIndexCorrequisito(indexSemestre: number, indexMateria: number): number {
    const index = this.materiaRequisitos.corequisitos
      .findIndex(materia => materia.id === this.semestres[indexSemestre].materias[indexMateria].id);
    return index;

  }

  addRequisito(indexSemestre: number, indexMateria: number) {
    let materiaRequisito = {} as Materia;
    materiaRequisito = this.semestres[indexSemestre].materias[indexMateria];

    // console.log(materiaRequisito);
    // console.log(this.materiaRequisitos);
    // console.log(this.asignandoRequisito);
    /* Añadir consideraciones de si ya es una prelacion o un requisito, no hacer push */
    if (this.asignandoRequisito === 'prelacion' || this.asignandoRequisito === 'corequisito') {
      switch (this.asignandoRequisito) {
        case 'prelacion': {
          const index = this.materiaRequisitos.prelaciones
            .findIndex(materia => materia.id === this.semestres[indexSemestre].materias[indexMateria].id);

          // console.log(this.esPrelacionDe());
          // console.log('​PensumComponent -> addRequisito -> index', index);
          if (this.materiaRequisitos.id !== materiaRequisito.id && index < 0) {
            this.materiaRequisitos.prelaciones.push(this.semestres[indexSemestre].materias[indexMateria]);
          } else {
            if (index >= 0) {
              this.materiaRequisitos.prelaciones.splice(index, 1);
            }
          }
          // console.log(this.materiaRequisitos.prelaciones);
          break;
        }
        case 'corequisito': {
          const index = this.materiaRequisitos.corequisitos
            .findIndex(materia => materia.id === this.semestres[indexSemestre].materias[indexMateria].id);

          if (this.materiaRequisitos.id !== materiaRequisito.id && index < 0) {
            this.materiaRequisitos.corequisitos.push(this.semestres[indexSemestre].materias[indexMateria]);
          } else {
            if (index >= 0) {
              this.materiaRequisitos.corequisitos.splice(index, 1);
            }
          }
          break;
        }
      }

    }
  }

  guardarRequisito() {
    if (this.asignandoRequisito === 'prelacion') {
      this.semestres[this.indexSemestreMatReq].materias[this.indexMateriaMatReq].prelaciones = this.materiaRequisitos.prelaciones;
    } else {
      if (this.asignandoRequisito === 'prelacion') {
        this.semestres[this.indexSemestreMatReq].materias[this.indexMateriaMatReq].corequisitos = this.materiaRequisitos.corequisitos;
      }
    }

  }

  ngOnInit() {

    this.servicioOpcionesPensum.pensumActivo.subscribe(pensumActivo => {
      this.pensumActivo = pensumActivo;
    });

    /* Init de valores desde BD */
    this.cargarPensum();

    this.semestres = [
      { numero: 1, materias: [] },
      { numero: 2, materias: [] },
      { numero: 3, materias: [] },
      { numero: 4, materias: [] },
      { numero: 5, materias: [] },
      { numero: 6, materias: [] },
      { numero: 7, materias: [] },
      { numero: 8, materias: [] },
      { numero: 9, materias: [] },
      { numero: 10, materias: [] }];
    console.log(this.semestres);
    // this.materias = [];
    // this.materiasService.getMaterias().subscribe(data => {
    //   this.materias = data;
    //   this.materias.forEach(materia => {
    //     materia.prelaciones = [];
    //     materia.corequisitos = [];
    //   });
    //   this.posicion = 0;
    //   this.calcularLimiteMateriasAMostrar(window.innerWidth);
    //   this.actualizarInfo();
    // });

  }

}


