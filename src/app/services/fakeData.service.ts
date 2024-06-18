import { Injectable } from '@angular/core';
import { FakeUser } from '../register/fake.interface';

@Injectable({
  providedIn: 'root'
})
export class FakeDataService {

	private apiUrl = 'https://randomuser.me/api';

	constructor() { }

	async get(): Promise<FakeUser> {
		try {
			const response = await fetch(this.apiUrl);
			const data = await response.json();

			return data;
		} 
		catch (error) {
			console.error('Error', error);
			return {} as FakeUser;
		}
	}

}
