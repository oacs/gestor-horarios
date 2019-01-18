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
  public listaMateria: MateriaClass[];

  constructor(
    private servicioConfiguracionHorario: ServicioConfiguracionHorariosService,
    private pensumService: PensumService,
    private materiaxPensumService: MateriasxpensumService,
    private router: Router,
  ) {
    this.selectPensum = new FormControl('');
    this.pensumService.getPensums().subscribe(pensums => {
      this.listaPensum = pensums;
    });

    this.selectPensum.valueChanges.subscribe(id => {
      this.materiaxPensumService.getMateriasxPensumId(id).subscribe(materias => {
        materias.forEach(materia => {
          this.listaMateria.push(new MateriaClass(
            materia.nombre,
            materia.id,
            materia.semestre,
            materia.horas,
            materia.maxH
          ));
        });
      });
    });

  }

  ngOnInit() {
    this.servicioConfiguracionHorario.horarioActual.subscribe(horario => {
      this.horarioActivo = horario;
    });

    this.servicioConfiguracionHorario.listaProfesoresActual.subscribe(lista => {
      this.horarioActivo = lista;
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
    this.router.navigate(['horarios', 'paso2']);
  }

}
