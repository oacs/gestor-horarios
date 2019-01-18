import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openned: boolean;


  constructor() {
    this.openned = false;
  }

  toggleMenu() {
    if (this.openned === true) {
      // let shand = document.getElementsByClassName('nav-icons') as HTMLCollectionOf<HTMLElement>;
      // shand[0].style.animation = "alternate";
      this.openned = false;

    } else {
      this.openned = true;
    }
  }

  ngOnInit() {
  }

}
