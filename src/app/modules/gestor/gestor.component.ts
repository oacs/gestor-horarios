import { Component, OnInit } from '@angular/core';
import { DatabaseService, Materia } from '../../database.service';

import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  newMatter: boolean;
  updateMatter: boolean;

  public search = new FormControl('');
  public materias: Materia[];

  public info: Materia[];
  public profileForm: FormGroup;
  public updateMatterForm: FormGroup;
  public materiaForm: FormGroup;

  public materiaTemporal: Materia;
  constructor(private dbService: DatabaseService, private formModal: FormBuilder) {
    this.newMatter = false;
    this.updateMatter = false;
    this.dbService.getMaterias().subscribe(materias => {
      this.materias = materias;
      this.info = materias;
    });
    this.search.valueChanges.subscribe(data => {
      this.info = this.filteredListOptions();
    });

    this.materiaForm = this.formModal.group({
      nombre: ['', Validators.required],
      // horas: ['', Validators.required],
      // horasMax: ['', Validators.required]
    });

    this.updateMatterForm = this.formModal.group({
      nombre: ['', Validators.required],
      // horas: ['', Validators.required],
      // horasMax: ['', Validators.required]
    });

  }

  /*
    Muestra y oculta el form para crear una materia nueva
  */
  showNewModal() {
    if (this.newMatter === true) {
      this.newMatter = false;
    } else {
      this.newMatter = true;
    }
  }

  /*
    Muestra y oculta el form para actualizar una materia existente
  */
  showUpdateModal(materia: Materia) {
    if (this.updateMatter === true) {
      this.updateMatter = false;
    } else {
      this.updateMatter = true;
      this.updateMatterForm.get('nombre').setValue(materia.nombre);
      this.materiaTemporal = materia;
    }
  }
  /*
    Guarda la informacion del form crear nueva materia en la base de datos
  */
  submitFormNewMatter() {
    if (this.materiaForm.valid) {
      this.dbService.insertMateria(this.materiaForm.value).subscribe(data => {
        if (data === null) {
          this.materias.push(this.materiaForm.value);
          this.newMatter = false;
          this.dbService.getMaterias().subscribe(materias => {
            this.materias = materias;
            this.info = materias;
          });
        }
      });
    }
  }

  submitFormUpdateMatter() {
    if (this.updateMatterForm.valid) {
      this.dbService.updateMateria(this.updateMatterForm.value).subscribe(data => {
        console.log(data);
        if (data === null) {
          this.materias[this.materias.indexOf(this.materiaTemporal)].nombre = this.updateMatterForm.value.nombre;
          this.updateMatter = false;
        }
      });
    }
  }

  /*
    Guarda la informacion del from crear nueva materia en la base de datos
  */
  submitForm() {
    console.log(this.profileForm.value);
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
