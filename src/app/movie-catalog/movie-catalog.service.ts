import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

	private apiUrl = 'http://api.tvmaze.com/search/shows?q=drama';

	constructor() { }

	async getMovies() {
		try {
			const response = await fetch(this.apiUrl);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			return data;
		} catch (error) {
			console.error('Error', error);
			return [];
		}
	}

}
