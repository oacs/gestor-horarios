import { Component, OnInit, Input } from '@angular/core';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';
import { Dias, Hora } from '../../../providers/algoritmo/enum';
import { BloqueHoras } from '../../../providers/algoritmo/BloqueHoras';
import { HorarioPeriodoClass } from '../../../providers/algoritmo/HorarioPeriodoClass';
import { ordenarPorDia } from '../../../providers/databaseTransalations/datoToString';

@Component({
  selector: 'app-tabla-horario',
  templateUrl: './tabla-horario.component.html',
  styleUrls: ['./tabla-horario.component.scss']
})
export class TablaHorarioComponent implements OnInit {

  // enums
  public dias = Dias;
  public hora = Hora;
  public utilidades = new HorarioPeriodoClass();

  @Input() horario: SeccionClass[][][];
  @Input() seccionActiva: SeccionClass;
  @Input() disponibilidad: number[][];
  constructor() {
    // this.horario = [];
    // for (let i = 0; i < 7; i++) {
    //   // 7 dias con 14 bloques
    //   this.horario.push([[], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    // }
    // this.horario[0][0].push(new SeccionClass('401'));
    // console.log('​GestorHorariosComponent -> constructor -> this.horario[0][0].length', this.horario[0][0]);
  }

  ngOnInit() {
  }

  public agregarSeccion(i: number, j: number) {
    console.log(this.seccionActiva);
    if (this.seccionActiva != null) {
      const index = this.horario[i][j].findIndex(seccion =>
        seccion.id === this.seccionActiva.id && seccion.idMateria === this.seccionActiva.idMateria);
      if (index < 0) {
        this.seccionActiva.BloqueHorasFinal.push(new BloqueHoras(i, j, (j + 1)));
        console.log('​this.seccionActiva.BloqueHorasFinal', this.seccionActiva.BloqueHorasFinal);
        this.seccionActiva.BloqueHorasFinal = this.utilidades.compactarBloques(this.seccionActiva.BloqueHorasFinal);
        const disp = this.seccionActiva.profesor.disponibilidad;
        let aux: BloqueHoras[] = [];
        // console.log('profesor.disponibilidad', this.seccionActiva.profesor.disponibilidad);
        this.seccionActiva.profesor.disponibilidad = [];

        this.utilidades.invertirBloques(disp).forEach(bloque => {
          aux.push(bloque);
        });
        aux.push(new BloqueHoras(i, j, (j + 1)));
        aux = this.utilidades.compactarBloques(aux);
        aux = ordenarPorDia(aux);
        this.seccionActiva.profesor.disponibilidad = this.utilidades.invertirBloques(aux);
        // console.log('profesor.disponibilidad', this.seccionActiva.profesor.disponibilidad);
        // console.log('BloqueHoras(i, j, (j + 1))', new BloqueHoras(i, j, (j + 1)));
        this.horario[i][j].push(this.seccionActiva);

      } else {
        this.horario[i][j].splice(index, 1);
      }
    }
  }

}
