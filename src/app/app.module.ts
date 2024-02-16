import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; 

//Routes
import {APP_ROUTING} from './app.routes';

//Services 
import {HeroesService} from './services/heroes.service';

//Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component'; 
import { AboutComponent } from './components/about/about.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import { HeroComponent } from './components/hero/hero.component'; 
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpClientModule } from '@angular/common/http';
import { HeroesMock } from '../assets/heroes-mock.service';
import { FormsModule } from '@angular/forms';
 

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent, 
    AboutComponent,
    HeroesComponent,
    HeroComponent, 
    HeroCardComponent, 
  ],
  imports: [
    BrowserModule,
    APP_ROUTING, 
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(HeroesMock)
  ],
  providers: [
    HeroesService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
