import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { DatabaseService } from '../../database.service';
@Component({
  selector: 'app-pensum',
  templateUrl: './pensum.component.html',
  styleUrls: ['./pensum.component.scss']
})

@NgModule({
  imports: [
    AngularFontAwesomeModule
  ]
})

export class PensumComponent implements OnInit {

  constructor(private dbService: DatabaseService) { }

  ngOnInit() {
    this.dbService.getMaterias().subscribe( data => {
      console.log(data);
    });
  }

}


