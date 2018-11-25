import { Component, OnInit } from '@angular/core';
import { DatabaseService, Materia } from '../../database.service';
@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  openned: boolean;
  public materias: Materia[];

  constructor(private dbService: DatabaseService) {
    this.openned = false;
    this.dbService.getMaterias().subscribe( materias => {
      this.materias = materias;
    })
  }

  matterModal() {
    if (this.openned === true) {
      this.openned = false;
    } else {
      this.openned = true;
    }
  }

  ngOnInit() {


  }

}
