import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../../providers/database/database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dbService: DatabaseService) {

  }

  ngOnInit() {
    /*this.dbService.getProfesores().subscribe( data => {
      console.log(data);
    });*/
  }

}
