import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PensumService, Pensum } from '../../../providers/pensum/pensum.service';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';
import { MateriasxpensumService } from '../../../providers/materiasxpensum/materiasxpensum.service';
import { ServicioOpcionesPensumService } from '../../../providers/servicioOpcionesPensum/servicio-opciones-pensum.service';

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

  public pensum_activo: Pensum;
  public id_pensum: string;
  public pensums: Pensum[];
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    // console.log(event.target.innerWidth);
    if (event.target.innerWidth > 1300) {
      this.limite = 6;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 1300 && event.target.innerWidth > 1040) {
      this.limite = 5;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 1040 && event.target.innerWidth > 700) {
      this.limite = 4;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 700 && event.target.innerWidth > 580) {
      this.limite = 3;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 580 && event.target.innerWidth > 400) {
      this.limite = 2;
      this.actualizarInfo();
      return;
    }
    if (event.target.innerWidth < 400) {
      this.limite = 1;
      this.actualizarInfo();
      return;
    }
  }

  constructor(
    private pensumSevice: PensumService,
    private materiasService: MateriaService,
    private materiasxpensumService: MateriasxpensumService,
    private formModal: FormBuilder,
    private servicioOpcionesPensum: ServicioOpcionesPensumService) {

    this.pensumSevice.getPensums().subscribe(pensums => {
      this.pensums = pensums;
      console.log(pensums);
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
        aux.push(materia);
      });
    });
    const infoAux: Materia[] = this.materias.filter(mat => !aux.includes(mat));
    this.info = infoAux.slice(this.posicion * this.limite,
      (this.posicion * this.limite) + this.limite);
  }



  // private guardar() {
  //   this.materias.forEach( materia => {
  //     this.dbService.
  //   })
  // }

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

  crearPensum() {
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
  }


  modificarPensum() {
    console.log(this.modifyPensumForm.value);
    if (this.modifyPensumForm.valid) {
      this.abrirPensum(this.modifyPensumForm.value.option);
    }
  }

  guardarPensum() {
    console.log('Guardar pensum');
  }

  abrirPensum(id: number) {
   /* this.materiasxpensumService.getMateriasxPensumId(id).subscribe(materias => {
      console.log(materias);
      materias.forEach(materia => {
        this.semestres[materia.semestre].materias.push(materia);
      });
    });+*/
  }

  ngOnInit() {
    this.servicioOpcionesPensum.pensumActivo.subscribe( pensumActivo => {
      this.pensum_activo = pensumActivo;
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
    console.log(this.semestres);
    this.materias = [];
    this.materiasService.getMaterias().subscribe(data => {
      this.materias = data;
      this.limite = 4;
      this.posicion = 0;
      this.actualizarInfo();
    });

  }

}


