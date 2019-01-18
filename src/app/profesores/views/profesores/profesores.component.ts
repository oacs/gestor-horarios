import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})
export class ProfesoresComponent implements OnInit {

  newProfesor: boolean;
  public profesorForm: FormGroup;




  constructor(private formModal: FormBuilder) { 
    this.newProfesor = false;
    

    this.profesorForm = this.formModal.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required]
      
    });
  }

  ngOnInit() {
  }


  /*
    Muestra y oculta el modal para crear un nuevo profesor
  */
 showNewModal() {
  if (this.newProfesor === true) {
    this.newProfesor = false;
  } else {
    this.newProfesor = true;
  }
}

}
