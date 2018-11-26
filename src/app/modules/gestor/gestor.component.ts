import { Component, OnInit } from '@angular/core';
import { DatabaseService, Materia } from '../../database.service';

import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
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
  public profileForm: FormGroup;

  constructor(private dbService: DatabaseService, private formModal: FormBuilder) {
    this.openned = false;
    this.dbService.getMaterias().subscribe(materias => {
      this.materias = materias;
      this.info = materias;
    });
    this.search.valueChanges.subscribe( data => {
      this.info = this.filteredListOptions();
    });

    this.profileForm = this.formModal.group({
      nombre: ['', Validators.required],
      horas: ['', Validators.required],
      horasMax: ['', Validators.required]
    });
  }

  /*
    Muestra y oculta el form para crear una materia nueva
  */
  matterModal() {
    if (this.openned === true) {
      this.openned = false;
    } else {
      this.openned = true;
    }
  }

  /*
    Guarda la informacion del from crear nueva materia en la base de datos
  */
  submitForm(){
    if ( this.profileForm.valid) {
      this.dbService.insertMateria(this.profileForm.value);
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
