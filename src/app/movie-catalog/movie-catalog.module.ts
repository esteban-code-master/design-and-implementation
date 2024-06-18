import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MovieCatalogComponent } from './movie-catalog.component';
import { MovieService } from './movie-catalog.service';

@NgModule({
	declarations: [
		MovieCatalogComponent
	],
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule.forChild([{ path: '', component: MovieCatalogComponent }])
	],
	providers: [MovieService]
})
export class MovieCatalogModule { }
