import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../providers/notificationService/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  test = 0;

  constructor(private servicioNotificaciones: NotificationService) { }

  testNotif() {
    this.test++;
    this.servicioNotificaciones.mostrarNotificacion('Mensaje exitoso numero: ' + this.test);
  }
  ngOnInit() {
    /*this.dbService.getProfesores().subscribe( data => {
      console.log(data);
    });*/
  }

}
