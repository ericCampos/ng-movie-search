import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';

@NgModule({
    declarations: [AppComponent, NavbarComponent, MovieSearchComponent],
    imports: [BrowserModule, FormsModule, HttpClientModule, RouterModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
