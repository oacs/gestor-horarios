import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  openned: boolean;
  titulo: string;

  constructor(private router: Router) {
    this.openned = false;
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event.url) {
        if (event.url.split('/')[1]) {
          this.titulo = 'Gestor ' + event.url.split('/')[1];
        } else {
          this.titulo = 'Menu Principal';
        }
      }
    });
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
