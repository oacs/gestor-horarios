import { Component, OnInit } from '@angular/core';
import { DatabaseService, Materia } from '../../database.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  openned: boolean;
  public search = new FormControl('');
  public materias: Materia[];
  public info: Materia[];
  constructor(private dbService: DatabaseService) {
    this.openned = false;
    this.dbService.getMaterias().subscribe(materias => {
      this.materias = materias;
      this.info = materias;
    });
    this.search.valueChanges.subscribe(data => {
      this.info = this.filteredListOptions();
    });
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

  filteredListOptions() {
    const posts = this.materias;
    const filteredPostsList = [];
    for (const post of posts) {
      if (post.nombre.match(this.search.value)) {
        filteredPostsList.push(post);
      }
    }
    return filteredPostsList;
  }

}
