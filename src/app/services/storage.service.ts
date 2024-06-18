import { Injectable } from '@angular/core';
import { User } from '../register/user.interface';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
	private TOKEN_STORAGE = 'DATA_USERS'
	
	constructor() {}

	findUserByEmail(email: string): User{
		const users = this.getStorage()
		const user = users.find(user => user.email === email)
		
		if(!user){
			throw new Error('user not found');
		}
		
		return user
	}

	isUserExist(email: string): boolean{
		const users = this.getStorage()
		return users.some(user=> user.email === email)
	}


	saveUser(user: User){
		const users = this.getStorage()
		users.push(user)

		localStorage.setItem(this.TOKEN_STORAGE, JSON.stringify(users));
	}

	private getStorage(): User[] {
		const storageUser: User[] = JSON.parse(localStorage.getItem(this.TOKEN_STORAGE) ?? '[]')
		return storageUser
	}
	
}
