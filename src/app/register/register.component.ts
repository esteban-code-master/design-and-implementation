import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { FakeDataService } from '../services/fakeData.service';
import { StorageService } from '../services/storage.service';
import { User } from './user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	registerForm!: FormGroup;

	constructor(
		private formBuilder: FormBuilder, 
		private navigation: NavController,
		private storageService: StorageService,
		private fakeDataService: FakeDataService
	) {}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			username: ['', [Validators.required]],
			name: ['', [Validators.required]],  
		});

		this.loadInitialData()
	}

	onRegister() {
		if (this.registerForm.valid) {
			const user = this.registerForm.value;
			
			this.saveLocalStorage({...user, date: new Date()})
			
			this.navigation.navigateForward('/login');
		}
	}

	navigateToLogin() {
		this.navigation.navigateBack('/login');
	}

	private async  loadInitialData(): Promise<void> {
		const fakeUser = await this.fakeDataService.get()

		this.registerForm.patchValue({
			email: fakeUser.results[0].email,
			username: fakeUser.results[0].login.username,
			name: fakeUser.results[0].name.first
		});
	  }


	private saveLocalStorage(user: User){
		const isUserExist = this.storageService.isUserExist(user.email)

		if(isUserExist){
			throw new Error('user exist');
		}

		this.storageService.saveUser(user)
	}
}
