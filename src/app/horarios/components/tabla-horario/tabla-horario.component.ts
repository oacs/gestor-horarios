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
  constructor() { }

  ngOnInit() {
  }

}
