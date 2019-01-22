import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../providers/notificationService/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public notifications: string[];

  constructor(private servicioNotificaciones: NotificationService) {
    this.notifications = [];
  }

  dismiss(index: number) {
    this.notifications.splice(index, 1);
  }

  ngOnInit() {
    this.servicioNotificaciones.mensajeActual.subscribe( msg => {
      if (msg !== '') {
        this.notifications.push(msg);
      }
    });
  }

}
