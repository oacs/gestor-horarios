import { Component, OnInit } from '@angular/core';
import { ServicioOpcionesPensumService } from '../../../providers/servicioOpcionesPensum/servicio-opciones-pensum.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PensumService, Pensum } from '../../../providers/pensum/pensum.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
  styleUrls: ['./opciones.component.scss']
})
export class OpcionesComponent implements OnInit {
  public pensum_activo: Pensum;
  public listaPensums: Pensum[];
  public activeNuevoPensum: boolean;
  public activeModificarPensum: boolean;
  public createPensumForm: FormGroup;
  public modifyPensumForm: FormGroup;

  constructor(private servicioOpcionesPensum: ServicioOpcionesPensumService,
    private formModal: FormBuilder,
    private pensumSevice: PensumService,
    private router: Router) {

    this.activeNuevoPensum = false;
    this.activeModificarPensum = false;

    this.pensumSevice.getPensums().subscribe(pensums => {
      this.listaPensums = pensums;
      // console.log(pensums);
    });

    /* BD */
    this.pensumSevice.getPensums().subscribe(pensums => {
      this.listaPensums = pensums;
      console.log(pensums);
    });

    /* Forms */
    this.createPensumForm = this.formModal.group({
      nombre: ['', Validators.required],
    });

    this.modifyPensumForm = this.formModal.group({
      option: ['', Validators.required],
    });

  }


  toggleActiveNuevo(event) {
    event.stopPropagation();

    if (this.activeNuevoPensum === false) {
      this.activeNuevoPensum = true;
    } else {
      this.activeNuevoPensum = false;
    }

    console.log(this.activeNuevoPensum);
  }

  toggleActiveModificar(event) {
    event.stopPropagation();
    if (this.activeModificarPensum === false) {
      this.activeModificarPensum = true;
    } else {
      this.activeModificarPensum = false;
    }

    console.log(this.activeModificarPensum);
  }


  /* SALTO A LA OTRA VISTA */
  crearPensum() {
    this.servicioOpcionesPensum.crearPensum({
      id: -1,
      fecha: this.createPensumForm.get('nombre').value
    });
    this.router.navigate(['/pensum/gestor']);
  }

  modificarPensum() {
    this.servicioOpcionesPensum.modificarPensum({
      id: -1,
      fecha: this.modifyPensumForm.get('option').value
    });
    this.router.navigate(['/pensum/gestor']);
  }




  ngOnInit() { }

}
