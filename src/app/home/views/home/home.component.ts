import { Component, OnInit } from '@angular/core';
import { test } from '../../../providers/algoritmo/test';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    /*this.dbService.getProfesores().subscribe( data => {
      console.log(data);
    });*/
    test();
  }

}
