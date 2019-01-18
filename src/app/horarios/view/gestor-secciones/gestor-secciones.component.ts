import { Component, OnInit } from '@angular/core';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { FormGroup, FormControl } from '@angular/forms';
import {Pensum} from '../../../providers/pensum/pensum.service';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';

@Component({
  selector: 'app-gestor-secciones',
  templateUrl: './gestor-secciones.component.html',
  styleUrls: ['./gestor-secciones.component.scss']
})
export class GestorSeccionesComponent implements OnInit {
  horarioActivo: HorarioPeriodoClass;
  listaProfesores: ProfesorClass[];


  public selectPensum: FormControl;
  public listaPensum: Pensum[];
  public listaMateria: Materia[];

  constructor(private servicioConfiguracionHorario: ServicioConfiguracionHorariosService) {
    this.selectPensum = new FormControl('');
  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe( horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe( lista => {
      this.horarioActivo = lista;
    });
  }

  // carga archivo de pensum
  loadFile() {

  }

}
