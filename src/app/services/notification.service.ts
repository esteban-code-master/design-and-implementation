import { Injectable } from '@angular/core';
import {
	PushNotificationSchema,
	PushNotifications,
	Token
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

	constructor() {}

	async initPush() {

		PushNotifications.requestPermissions().then(result => {
			if (result.receive === 'granted') {
				PushNotifications.register();
				return
			} 

			console.error('Push notifications are not enabled.');
		});

		PushNotifications.addListener('registration', 
			(token: Token) => {
				console.log('Push registration success, token: ' + token.value);
			}
		);

		PushNotifications.addListener('pushNotificationReceived',
		(notification: PushNotificationSchema) => {
				console.log('Push received: ' + JSON.stringify(notification));
			
				this.showNotification(notification);
			}
		);
	}

	private showNotification(notification: PushNotificationSchema) {
		alert('Evento: ' + notification.title);
	}
}
