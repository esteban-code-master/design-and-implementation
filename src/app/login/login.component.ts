import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { PushNotificationService } from '../services/notification.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	public loginForm!: FormGroup;
	private redirectSuccessful = '/movies'
	private redirectRegister = '/register'

	constructor(
		private formBuilder: FormBuilder, 
		private router: NavController, 
		private pushNotificationService: PushNotificationService,
		private storageService: StorageService
	) {}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});

		this.pushNotificationService.initPush();
	}

	onLogin() {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;
			
			const user = this.storageService.findUserByEmail(email)

			if (user && user.password === password) {
				this.router.navigateForward(this.redirectSuccessful);
				return
			}

			console.log('Invalid credentials');
		}
	}

	navigateToRegister() {
		this.router.navigateForward(this.redirectRegister);
	}
}
