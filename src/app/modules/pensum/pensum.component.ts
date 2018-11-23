import { Component, OnInit } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NgModule } from '@angular/core';
import { PensumService } from './pensum.service';
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

  constructor(private pensumService: PensumService) { }

  ngOnInit() {
  }

}


