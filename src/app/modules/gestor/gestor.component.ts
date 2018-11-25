import { Component, OnInit } from '@angular/core';
import { DatabaseService, Materia } from '../../database.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  openned: boolean;
  public materias: Materia[];
  public profileForm: FormGroup;

  constructor(private dbService: DatabaseService, private formModal: FormBuilder) {
    this.openned = false;
    this.dbService.getMaterias().subscribe( materias => {
      this.materias = materias;
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
    console.log(this.profileForm.value);
  }

  ngOnInit() {


  }

}
