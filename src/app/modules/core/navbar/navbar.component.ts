import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openned : boolean;

  constructor() { 
    this.openned = false;
  }

  toggleMenu() {
    if(this.openned == true)
      this.openned = false;
    else  
      this.openned = true;
  }

  ngOnInit() {
  }

}
