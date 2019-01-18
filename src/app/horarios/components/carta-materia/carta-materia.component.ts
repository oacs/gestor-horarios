import { Component, OnInit, Input } from '@angular/core';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';

@Component({
  selector: 'app-carta-materia',
  templateUrl: './carta-materia.component.html',
  styleUrls: ['./carta-materia.component.scss']
})
export class CartaMateriaComponent implements OnInit {

  @Input() materia: MateriaClass;
  constructor() { }

  ngOnInit() {
  }

}
