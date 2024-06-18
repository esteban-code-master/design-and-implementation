import { Component, OnInit } from '@angular/core';
import { MovieService } from './movie-catalog.service';

@Component({
  selector: 'app-movie-catalog',
  templateUrl: './movie-catalog.component.html',
  styleUrls: ['./movie-catalog.component.scss'],
})
export class MovieCatalogComponent implements OnInit {

  	movies: any = [];

	constructor(private movieService: MovieService) {}

	ngOnInit() {
		this.loadMovies();
	}

	async loadMovies() {
		this.movies = await this.movieService.getMovies();

		console.log(this.movies)
	}
	
}

