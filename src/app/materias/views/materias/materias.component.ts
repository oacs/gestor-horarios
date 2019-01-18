import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MateriaService, Materia } from '../../../providers/materia/materia.service';
@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {
  newMatter: boolean;
  updateMatter: boolean;

  public search = new FormControl('');
  public materias: Materia[];

  public info: Materia[];
  public profileForm: FormGroup;
  public updateMatterForm: FormGroup;
  public materiaForm: FormGroup;

  public materiaTemporal: Materia;
  constructor(private materiasService: MateriaService, private formModal: FormBuilder) {
    this.newMatter = false;
    this.updateMatter = false;
    this.materiasService.getMaterias().subscribe(materias => {
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
      this.materiasService.insertMateria(this.materiaForm.value).subscribe(data => {
        if (data.id !== null) {
          const mat: Materia = this.materiaForm.value;
          mat.id = data.id;
          this.materias.push(mat);
          this.newMatter = false;
        }
      });
    }
  }

  submitFormUpdateMatter() {
    console.log(this.materiaTemporal);
    if (this.updateMatterForm.valid) {
      this.materiasService.updateMateria(this.updateMatterForm.value, this.materiaTemporal.id).subscribe(data => {
        console.log(data);
        if (data.status === 1) {
          this.materias[this.materias.indexOf(this.materiaTemporal)].nombre = this.updateMatterForm.value.nombre;
          this.updateMatter = false;
        } else {
          console.log(data.err);
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

  deleteMatter() {
    console.log(this.materiaTemporal);
    this.materiasService.deleteMateria(this.materiaTemporal).subscribe(data => {
      console.log(data);
      if (data === null) {
        this.materias.splice(this.materias.indexOf(this.materiaTemporal), 1);
        this.updateMatter = false;
      }

    });
  }

  filteredListOptions() {
    const posts = this.materias;
    const filteredPostsList = [];
    for (const post of posts) {
      if (post.nombre.toLocaleLowerCase().indexOf(this.search.value.toLocaleLowerCase()) >= 0) {
        filteredPostsList.push(post);
      }
    }
    return filteredPostsList;
  }

}
