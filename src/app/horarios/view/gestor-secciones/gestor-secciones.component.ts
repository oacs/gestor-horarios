import { Component, OnInit } from '@angular/core';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ProfesorClass } from '../../../providers/algoritmo/profesorClass';
// tslint:disable-next-line:max-line-length
import { ServicioConfiguracionHorariosService } from '../../../providers/servicioConfiguracionHorarios/servicio-configuracion-horarios.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Pensum, PensumService } from '../../../providers/pensum/pensum.service';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';
import { MateriasxpensumService } from '../../../providers/materiasxpensum/materiasxpensum.service';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';
import { Router } from '@angular/router';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';

@Component({
  selector: 'app-gestor-secciones',
  templateUrl: './gestor-secciones.component.html',
  styleUrls: ['./gestor-secciones.component.scss']
})
export class GestorSeccionesComponent implements OnInit {
  public horarioActivo: HorarioPeriodoClass;
  public listaProfesores: ProfesorClass[];


  public selectPensum: FormControl;
  public listaPensum: Pensum[];
  public listaMateria: MateriaClass[];

  constructor(
    private servicioConfiguracionHorario: ServicioConfiguracionHorariosService,
    private pensumService: PensumService,
    private materiaxPensumService: MateriasxpensumService,
    private router: Router
  ) {
    this.selectPensum = new FormControl('');
    this.pensumService.getPensums().subscribe(pensums => {
      this.listaPensum = pensums;
    });
    this.listaMateria = [];

    this.selectPensum.valueChanges.subscribe(id => {
      this.materiaxPensumService.getMateriasxPensumId(id).subscribe(materias => {
        this.listaMateria = [];
        materias.forEach(materia => {
          const materiaAux = new MateriaClass(
            materia.nombre,
            materia.id,
            materia.semestre,
            materia.horas,
            materia.maxH
          );
          materiaAux.secciones.push(new SeccionClass('401'));
          this.listaMateria.push(materiaAux);
        });
      });
    });

  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
      console.log(horario);
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.listaProfesores = lista;
    });
  }

  // carga archivo de pensum
  loadFile() {

  }

  public siguientePaso() {
    // this.listaMateria.forEach(materia => {
    //   if (materia.secciones.length <= 0) {
    //     console.log('Alerta: Faltan materias con secciones en 0');
    //   }
    // });
    this.listaMateria.forEach(materia => {
      this.horarioActivo.materiasPorSemestre[materia.semestre - 1].push(materia);
    });
    this.servicioConfiguracionHorario.updateHorarioActual(this.horarioActivo);
    this.router.navigate(['horarios', 'paso2']);
  }

}
