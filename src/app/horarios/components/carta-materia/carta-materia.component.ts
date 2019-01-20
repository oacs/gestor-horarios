import { Component, OnInit, Input } from '@angular/core';
import { MateriaClass } from '../../../providers/algoritmo/materiaClass';
import { SeccionClass } from '../../../providers/algoritmo/seccionClass';

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

  public cambiarSeccion(numero: number) {
    if (numero > 0) {
      this.materia.secciones.push(new SeccionClass('40' + (this.materia.secciones.length + 1)));
    } else {
      this.materia.secciones.pop();
    }
  }

}
