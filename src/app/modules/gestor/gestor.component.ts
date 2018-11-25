import { Component, OnInit } from '@angular/core';
import data from './testData';
@Component({
  selector: 'app-gestor',
  templateUrl: './gestor.component.html',
  styleUrls: ['./gestor.component.scss']
})
export class GestorComponent implements OnInit {
  openned: boolean;
  public materias : any[] = data;

  constructor() { 
    this.openned = false;
  }

  matterModal(){
    if(this.openned == true)
      this.openned = false;
    else
      this.openned = true;
  }

  ngOnInit() {


  }

}
