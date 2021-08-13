import { Component, OnInit } from '@angular/core';
import { 
  PushNotificationSchema,
  PushNotifications,
  PushNotificationToken,
  PushNotificationActionPerformed
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor() {}

  ngOnInit(): void{

    //Pedir permiso de notificacion
    PushNotifications.requestPermissions().then(result => {
      if(result.receive === 'granted'){
        //Registrar o establecer el enlace de notificaciones
        PushNotifications.register();
      }
      else{
        console.log("Error: No se dio permiso");
      }
    });

    PushNotifications.addListener('registration', (token: PushNotificationToken) => {
      alert('Se registro el uso de notificaciones en el token:' + token.value);
    });

    PushNotifications.addListener('registrationError', (error:any) => {
      alert('Error en el registro: ' + JSON.stringify(error));
    });

    PushNotifications.addListener('pushNotificationReceived',(notification:PushNotificationSchema) => {
      alert('Se recibió una notificación: ' + JSON.stringify(notification));
    });

    PushNotifications.addListener('pushNotificationActionPerformed', (notificacion: PushNotificationActionPerformed) => {
      alert('La accion se ejecuto correctamente: ' + JSON.stringify(notificacion));
    });

  }

}
