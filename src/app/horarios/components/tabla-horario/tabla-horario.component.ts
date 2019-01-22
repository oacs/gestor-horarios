import { Component, OnInit, Input } from '@angular/core';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';
import { Dias, Hora } from '../../../providers/algoritmo/enum';

@Component({
  selector: 'app-tabla-horario',
  templateUrl: './tabla-horario.component.html',
  styleUrls: ['./tabla-horario.component.scss']
})
export class TablaHorarioComponent implements OnInit {

  // enums
  public dias = Dias;
  public hora = Hora;

  @Input() horario: SeccionClass[][][];
  constructor() {
    this.horario = [];
    for (let i = 0; i < 7; i++) {
      // 7 dias con 14 bloques
      this.horario.push([[], [], [], [], [], [], [], [], [], [], [], [], [], []]);
    }
    this.horario[0][0].push(new SeccionClass('401'));
    console.log('​GestorHorariosComponent -> constructor -> this.horario[0][0].length', this.horario[0][0]);
  }

  ngOnInit() {
  }

}
